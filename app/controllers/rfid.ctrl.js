(function () {
    angular.module('rfidApp').controller('RfidController', ['$scope', 'logger','serialPort', 'googleClientService', RfidCtrl]);

    function RfidCtrl($scope, logger, serialPort, googleClientService) {
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
        $scope.nfcValue;
        $scope.nfcMessage = "Scan RFID Card";
        var strData = "";
    		//Open the serial data
    		serialPort.open(function () {
    			console.log('open');

    			// Read in the data
    			serialPort.on('data', function(data) {
            // $scope.nfcValue += data;
            // show only card values
            //console.log('LENGTH', $scope.nfcValue.length);

    				//Display the data
    				// Need to use $scope.$apply() because this is within another function.
    				// http://stackoverflow.com/questions/10179488/the-view-is-not-updated-in-angularjs
    				//$scope.$apply(function() { $scope.ReadBuffer = data; });

    				$scope.$apply(function() { $scope.nfcValue = data; });
    			  //$scope.buffer = (data + $scope.buffer).substr(0, 5000);

            $scope.nfcValue = $scope.nfcValue.replace(/[\n\r\s]/g, "").substring(1);
            // console.log('NFC', new String($scope.nfcValue));
            // console.log('NFCLength', $scope.nfcValue.length);
            if ($scope.nfcValue.length > 12) {
              $scope.nfcValue = $scope.nfcValue.substring(1);
            }
            if ($scope.nfcValue.length == 12) {
              // Verify ID      
              $scope.results = [];
              $scope.httpStatus = 0;
              $scope.LoadRequest = googleClientService.loadClientList();
              googleClientService.loadClientList()
              .then(function(results){

                $scope.httpStatus = 200;
                $scope.results = results;
                //console.log('###', results);

                for (var i=0; i<results.length; i++){
                    var nfcvalue = $scope.nfcValue;
                    var gsvalue = results[i]['gsx$rfidtag']['$t'];
                    // console.log('RFID', gsvalue);
                    // console.log("VALUE", nfcvalue);
                    // console.log("MATCH", gsvalue === nfcvalue);
                    if (gsvalue === nfcvalue ) {
                      $scope.nfcMessage = "Welcome " + results[i]['gsx$name']['$t'];
                      console.log('matched', $scope.nfcMessage);
                      break;
                    }
                }
              });
            }

    			});

    		});
    }
})();
