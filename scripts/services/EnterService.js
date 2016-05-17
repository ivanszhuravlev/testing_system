"use strict";

angular.module('testApp')
    .factory('EnterService', ['$http', 'SessionService', '$rootScope', 'UserService',
                              function($http, SessionService, $rootScope, UserService) {
        var response = "4";
        return {
            login : function (enter_user) {
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

                            $rootScope.nav  = './views/nav.html';
                            $rootScope.view = './views/blocks.html';
                            $rootScope.auth = './views/logout_panel.html';

                            UserService.set(response.id);

                            $rootScope.user = UserService.get();
                            break;
                    }
                });
            },

            logout : function () {
                SessionService.destroy('uid');
                UserService.logout();

                $rootScope.nav = '';
                $rootScope.view = './views/welcome.html';
                $rootScope.auth = './views/login_panel.html';
            },

            isLogged : function () {
                var $checkSessionServer = $http.post('./php/data/check_session.php');
                return $checkSessionServer;
            }
        };
    }]);