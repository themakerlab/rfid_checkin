'use strict';

angular.module('rfidApp')
.factory('googleClientService', [
    '$q', '$http', '$sce',
    function ($q, $http, $sce) {
        var loadClientList = function(){
            console.log('loading..');
            var deferred = $q.defer();
            var sheet = '1vC9L938SYWqFS3lrst3RZAkpdu-pyVgdr1oqxLWfdbY';
            //var key = '1ScS6Kyohy1sq0hb1iginF-RJcZ-wG6rNgJ5hkapRM0Q';
            // CSV file https://docs.google.com/spreadsheets/d/1vC9L938SYWqFS3lrst3RZAkpdu-pyVgdr1oqxLWfdbY/pub?gid=0&single=true&output=csv
            var url = 'https://spreadsheets.google.com/feeds/list/' + sheet + '/1/public/values?alt=json';

            $http.jsonp($sce.trustAsResourceUrl(url))
            .then(function successCallback(dataObject) {

                var results = [];
                var feed = dataObject.data.feed;
                //console.log('!!', dataObject);
                var entries = feed.entry || [];
                for (var i=0; i<entries.length; i++){
                    var value = entries[i];
                    results.push(value);
                }
                deferred.resolve(results);
            }, function errorCallback(reason) {
                deferred.reject(reason);
                console.log("Fail", reason);
            });
            return deferred.promise;
        };
        return {
            loadClientList: loadClientList
        };
    }]);
