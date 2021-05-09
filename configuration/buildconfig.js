'use strict';

const SERVER_PROTOCOL = 'http';
const SERVER_HOSTNAME = process.env.HOSTNAME || '127.0.0.1';
const SERVER_PORT = 8082;
const CLIENT_PORT = parseInt(process.env.PORT) || 5000 /** Heroku */;

module.exports = {
	isDebugMode: false,
	isDevelopmentMode: (process.env.NODE_ENV || 'development').trim().toLowerCase() === 'development',
	dev: {
		hostname: SERVER_HOSTNAME,
		port: SERVER_PORT,
		publicPath: `${SERVER_PROTOCOL}://${SERVER_HOSTNAME}:${SERVER_PORT}/dist/`
	},
	realport: CLIENT_PORT,
	disabledChunkhash: false,
	tmpl: {
		master: 'index',
		extname: '.html'
	},
	paths: {
		src: {
			base: './src/',
			views: './src/shared/views/',
			layouts: './src/shared/views/layouts/'
		},
		output: {
			base: './wwwroot/',
			dist: './wwwroot/dist/'
		}
	},
	urls: {
		publicPath: './dist/'
	}
};
