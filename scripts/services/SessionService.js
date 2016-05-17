"use strict";

angular.module('testApp')
    .factory('SessionService', ['$http', function($http) {
        return {
            set : function (key, value) {
                return sessionStorage.setItem(key, value);
            },
            get : function (key) {
                return sessionStorage.getItem(key);
            },
            destroy: function () {
                $http.post('./php/data/destroy_session.php');
                return sessionStorage.removeItem('uid');
            },
            check: function () {
                var $checkSessionServer = $http.post('./php/data/check_session.php');
                return $checkSessionServer;
            }
        };
    }]);