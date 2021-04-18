'use strict';

export const CREATOR = 'Victor Timoshin';

export const SERVER_DEBUG = true;
export const SERVER_PROTOCOL = 'http';
export const SERVER_IP_ADDRESS = process.env.IP || '127.0.0.1';
export const SERVER_PORT = 8082;
export const CLIENT_PORT = parseInt(process.env.PORT as string) || 8080;

export const buildConfg = {
	isDevelopmentMode: (process.env.NODE_ENV || 'development').trim().toLowerCase() === 'development',
	dev: {
		ipaddress: SERVER_IP_ADDRESS,
		port: SERVER_PORT,
		publicPath: `${SERVER_PROTOCOL}://${SERVER_IP_ADDRESS}:${SERVER_PORT}/dist/`
	},
	realport: CLIENT_PORT,
	disabledChunkhash: false,
	tmpl: {
		master: 'index',
		extname: '.html'
	},
	paths: {
		src: {
			base: 'src/',
			views: 'src/shared/views/',
			layouts: 'src/shared/views/layouts/'
		},
		output: {
			base: 'wwwroot/',
			dist: 'wwwroot/dist/'
		}
	},
	urls: {
		publicPath: 'dist/'
	}
};
