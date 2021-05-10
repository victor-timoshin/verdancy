'use strict';

import * as _ from 'underscore';
import fs from 'fs';
import path from 'path';
import * as http from 'http';
import WebSocket from 'ws';
import StrictEventEmitter from 'strict-event-emitter-types';
import { EventEmitter } from 'events';
import SocketIO from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { IndexSymbolEnum, IndexSymbolUtils } from '../core/api/_exports';

const buildConfg = require('../../configuration/buildconfig.js');

function reconnectBinanceWS(symbol: string, onclose: (event: WebSocket.CloseEvent) => void): WebSocket {
	const binanceWS = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol}@depth@1000ms`);
	binanceWS.onclose = onclose;
	binanceWS.onopen = (event: WebSocket.OpenEvent) => {
		console.log('WebSocket connected to Binance');
	};

	return binanceWS;
}

function createSocket(server: http.Server) {
	const socketio = new SocketIO.Server(server, {
		path: '/socket.io'
	});

	let binanceWS = reconnectBinanceWS(IndexSymbolUtils.enumToStr(IndexSymbolEnum.BTCUSDT).toLowerCase(), (event: WebSocket.CloseEvent) => {
		console.log('WebSocket disconnected from Binance');
	});

	socketio.on('connection', (socket: SocketIO.Socket<DefaultEventsMap, DefaultEventsMap>) => {
		binanceWS.onmessage = (event: WebSocket.MessageEvent) => {
			socket.emit('diff_depth_stream', event.data);
		}

		socket.on('diff_depth_stream__update_symbol', (message: { symbol: string }) => {
			binanceWS.close();
			binanceWS = reconnectBinanceWS(message.symbol.toLowerCase(), (event: WebSocket.CloseEvent) => {
				console.log('disconnected to Binance');
			});
		});

		socket.on('disconnect', () => {
			// Empty
		});
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
			if (fs.existsSync(path.resolve(process.cwd(), buildConfg.paths.output.base))) {
				var template = fs.readFileSync(path.resolve(process.cwd(), buildConfg.paths.output.base, 'index.html'), {
					encoding: 'utf8'
				});

				response.writeHead(200, { 'Content-type': 'text/html' });
				response.end(template);
			}
		}
	}
};

export class WebServer extends (EventEmitter as new () => StrictEventEmitter<EventEmitter, WebServerEventEmitter>) {
	private serv_ = new HttpServer();
	public readonly httpserver: http.Server = http.createServer((request: http.IncomingMessage, response: http.ServerResponse) => {
		this.serv_.process(request, response);
	});

	public constructor(
		private readonly port: number) {
		super();
	}

	public async listen(): Promise<void> {
		await new Promise<void>(resolve => {
			createSocket(this.httpserver.listen(this.port, () => {
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
