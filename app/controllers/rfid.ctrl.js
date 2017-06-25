(function () {
    angular.module('rfidApp').controller('RfidController', ['$scope', 'logger','serialPort', RfidCtrl]);

    function RfidCtrl($scope, logger, serialPort) {
        // This will be the base value.
        // $scope.getPorts = function() {
      		//Get the serialport listings
      		// require("serialport").list(function (err, ports) {
          //
      		// 	// Set the response
      		// 	// Need to use $scope.$apply() because this is within
      		// 	// another function.
      		// 	// http://stackoverflow.com/questions/10179488/the-view-is-not-updated-in-angularjs
      		// 	// $scope.$apply(function() { SerialPortOptions.ports = ports; });
          //
      		// 	// Display the port info to the console
      		// 	var portInfo = "";
      		// 	ports.forEach(function (port) {
      		// 		console.log(port.comName);
      		// 		console.log(port.pnpId);
      		// 		console.log(port.manufacturer);
          //
      		// 	});
      		// });
      	// }

        //Initialize the serial port
    		// var SerialPort = require("serialport").SerialPort
    		// var serialPort = new SerialPort("/dev/tty.usbserial-A104OOO7", { baudrate: 9600 }); ///dev/cu.usbserial-A104OOO7
        $scope.nfcValue = "Scan RFID Card";
    		//Open the serial data
    		serialPort.open(function () {
    			console.log('open');

    			// Read in the data
    			serialPort.on('data', function(data) {
            // $scope.nfcValue += data;
            // show only card values
            if ($scope.nfcValue.length > 13) {
              $scope.nfcValue = "";
            }
    				//Display the data
    				// Need to use $scope.$apply() because this is within
    				// another function.
    				// http://stackoverflow.com/questions/10179488/the-view-is-not-updated-in-angularjs
    				$scope.$apply(function() { $scope.ReadBuffer += data; });
    				//$scope.serialData += data;

    				$scope.$apply(function() { $scope.nfcValue += data; });
    				//$scope.$apply(function() { SerialPortOptions.buffer = data });
    			  $scope.buffer = (data + $scope.buffer).substr(0, 5000);

    			});

    		});
    }
})();
