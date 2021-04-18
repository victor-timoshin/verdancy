'use strict';

import * as _ from 'underscore';
import fs from 'fs';
import path from 'path';
import * as http from 'http';
import WebSocket from 'ws';
import StrictEventEmitter from 'strict-event-emitter-types';
import { EventEmitter } from 'events';
import SocketIO from 'socket.io';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import { buildConfg } from '../../configuration/buildconfig';

function createSocket(server: http.Server) {
	const socketio = new SocketIO.Server(server, {
		path: '/socket.io'
	});

	const binanceWS = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@depth@1000ms');
	binanceWS.on('open', () => {
		console.log('connected to Binance');
	});

	socketio.on('connection', (socket: SocketIO.Socket<DefaultEventsMap, DefaultEventsMap>) => {
		binanceWS.onmessage = (event: WebSocket.MessageEvent) => {
			socket.emit('diff_depth_stream', event.data);
		}
	});
}

interface WebServerEventEmitter {
	listening: (this: WebServer) => this;
};

interface IHttpServer {
	process(req: http.IncomingMessage, res: http.ServerResponse): void;
};

class HttpServer implements IHttpServer {
	public process(request: http.IncomingMessage, response: http.ServerResponse): void {
		let filePath = '.' + request.url;
		if (_.contains(filePath.split('/'), 'dist')) {
			let contentType = 'text/html';
			switch (path.extname(filePath)) {
				case '.js':
					contentType = 'text/javascript';
					break;
				case '.css':
					contentType = 'text/css';
					break;
				case '.json':
					contentType = 'application/json';
					break;
			}

			var file = fs.readFileSync(path.resolve(process.cwd(), buildConfg.paths.output.dist, path.parse(filePath).base), {
				encoding: 'utf8'
			});

			response.writeHead(200, { 'Content-type': contentType });
			response.end(file);
		}

		if (request.url === '/') {
			if (fs.existsSync(path.resolve(process.cwd(), buildConfg.paths.output.base))) {
				var template = fs.readFileSync(path.resolve(process.cwd(), buildConfg.paths.output.base, 'index.html'), {
					encoding: 'utf8'
				});

				response.writeHead(200, { 'Content-type': 'text/html' });
				response.end(template);
			}
		}

		if (request.url === '/about') {
			response.setHeader('Content-Type', 'text/html');
			response.write('<h1>About</h1>');
			response.end();
		}
	}
};

export class WebServer extends (EventEmitter as new () => StrictEventEmitter<EventEmitter, WebServerEventEmitter>) {
	private serv_ = new HttpServer();
	public readonly httpserver: http.Server = http.createServer((request: http.IncomingMessage, response: http.ServerResponse) => {
		this.serv_.process(request, response);
	});

	public constructor(
		private readonly ipaddress: string,
		private readonly port: number) {
		super();
	}

	public async listen(): Promise<void> {
		await new Promise<void>(resolve => {
			createSocket(this.httpserver.listen(this.port, this.ipaddress, () => {
				resolve();
			}));
		});

		this.emit('listening');
	}

	public async close(): Promise<void> {
		await new Promise<void>(resolve => {
			if (this.httpserver.listening) {
				this.httpserver.close(() => {
					resolve();
				});
			}
		});
	}
};
