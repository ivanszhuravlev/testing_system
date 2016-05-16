angular.module('testApp')
    .factory('EnterService_old', ['$http', '$rootScope', function ($http, $rootScope) {
        var response_code;
        return function (enter_user) {
            $http.post("./php/enter.php", enter_user)
                .success(function (data) {
                    response_code = data;
                })
                .then(function () {
                    switch(response_code) {
                        case "0":
                            $rootScope.nav = './views/nav.html';
                            $rootScope.view = './views/blocks.html';
                            break;
                        case "1":
                            alert("Cannot connect with database");
                            break;
                        case "2":
                            alert("No such email adress");
                            break;
                        case "3":
                            alert("Wrong password");
                            break;
                        default:
                            alert("Query failed");
                            break;
                    }
                });
        };
    }]);