const winston = require('winston');
require('winston-daily-rotate-file');

const logger = winston.createLogger({

	transports: [
		new (winston.transports.DailyRotateFile)({

			filename: 'logs/%DATE%.log',
			datePatter: 'YYYY-MM-DD-HH',
			zippedArchive: true,
			maxSize: '20m',
			maxFiles: '14d'

		})
	],

	format: winston.format.combine(
	
		winston.format.timestamp({
			format: 'DD-MM-YYYY HH:mm:ss'
		}),

		winston.format.printf(info => {
			let ret = {};
			ret.message = info.message || '';
			ret.timestamp = info.timestamp || '';
			ret.status = info.status || '';
			ret.level = info.level || ''; // tipo de error, warning, info
			ret.method = info.req ? info.req.method : '';
			return(`[${ret.timestamp}] ${ret.level} ${ret.method} ${ret.status} ${ret.message} `);
		})
	),

	level: 'info',
	exitOnError: false



});



module.exports.logger = logger;
