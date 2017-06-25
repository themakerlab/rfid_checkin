(function () {
	const winston = require('winston');
	require('winston-daily-rotate-file');
	const ElectronConsole = require('winston-electron');
	const fs = require('fs');
	require('dotenv').config();

	// Make sure logs directory exists because winston with
	// throw error if directory doesn't exist.
	const logDir = "logs";
	if (!fs.existsSync(logDir)) {
		fs.mkdirSync(logDir);
	}

	var transports = [];

	// Setup logger.
	transports.push(new winston.transports.DailyRotateFile({
		filename: logDir + '/./log',
		datePattern: 'yyyy-MM-dd.',
		prepend: true,
		level: 'info'
	}));

	// if (process.env.NODE_ENV && process.env.NODE_ENV.toUpperCase() == "DEVELOPMENT") {
	// 	transports.push(new ElectronConsole({
	// 		timestamp: true
	// 	}));
	// }

	var logger = new (winston.Logger)({
		transports: transports
	});

	// var serialPort = require("serialport");
	// const SerialPort = serialPort.SerialPort;
	// var sp;
	//sp = new SerialPort("cu.usbserial-A104007", null, true);

  // Configure Angular Module
	angular.module('rfidApp', ['ngRoute']);

	// Inject winston into Angular
	angular.module('rfidApp').value('logger', logger);

	var SerialPort = require("serialport").SerialPort
	var serialPort = new SerialPort("/dev/tty.usbserial-A104OOO7",
												{ baudrate: 9600
										});

	// Add serial objects
	angular.module('rfidApp').value('serialPort', serialPort);
	// angular.module('rfidApp').value('sp', sp);


	// Configure Angular Module
	angular.module('rfidApp').config(['$routeProvider', configure]);

	function configure($routeProvider) {

		// Configure application routes
		$routeProvider
			.when('/scan', {
				templateUrl: '../views/templates/scan.html',
				controller: 'RfidController'
			})

			.otherwise({ redirectTo: '/scan' });
	}


})();
