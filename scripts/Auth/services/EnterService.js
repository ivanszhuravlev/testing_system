"use strict";

angular.module('testApp')
    .factory('EnterService', ['$http', 'SessionService', '$rootScope', 'UserService', '$location',
                              function($http, SessionService, $rootScope, UserService, $location) {
        var response = "4";
        return {
            login : function (enter_user) {
                /**
                 * Recieve user Id and session token from server;
                 * Store them into 'response':
                 * 'id' - user id, 'value' - token.
                 */
                $http.post("./php/enter.php", enter_user)
                .success(function (data) {
                    response = data;
                })
                .then(function () {
                    switch(response) {
                        case "1":
                            alert("Cannot connect with database");
                            break;
                        case "2":
                            alert("No such email adress");
                            break;
                        case "3":
                            alert("Wrong password");
                            break;
                        case "4":
                            alert("Query failed");
                            break;
                        default:
                            SessionService.set("uid", response.value);

                            $location.path('/user_' + response.id + '/blocks').replace();

                            UserService.set(response.id);
                            $rootScope.user = {};
                            UserService.getUser(response.id).success(function(data){
                                $rootScope.user = UserService.set(data);
                                $rootScope.user.page = parseInt($rootScope.user.page);
                            });
                            break;
                    }
                });
            },

            logout : function () {
                SessionService.destroy('uid');
                UserService.logout();

                $location.path('/').replace();
            },

            isLogged : function () {
                var $checkSessionServer = $http.post('./php/data/check_session.php');
                return $checkSessionServer;
            }
        };
    }]);