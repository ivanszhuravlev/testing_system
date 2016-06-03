angular.module('testApp')
    .factory('RegService', ['$http', 'RegValues', '$rootScope', 'SessionService', 'UserService', '$location',
                            function ($http, RegValues, $rootScope, SessionService, UserService, $location) {

        var RegService = {};
        var model = RegValues;

        RegService.checkNick = function (field, nickname) {
            $http.post("./php/check_nick.php", { nickname : nickname }).success(function(data) {
                if (data == "0") {
                    model.reg_user.nick = 0;
                    field.classList.remove("incorrect");
                    field.classList.add("correct");
                } else {
                    model.reg_user.nick = 1;
                    field.classList.remove("correct");
                    field.classList.add("incorrect");
                }
            });
        };

        RegService.checkEmail = function (field, email) {
            $http.post("./php/check_email.php", { email : email }).success(function(data) {

                if (data == "0") {
                    model.reg_user.email = 0;
                    field.classList.remove("incorrect");
                    field.classList.add("correct");
                } else {
                    model.reg_user.email = 1;
                    field.classList.remove("correct");
                    field.classList.add("incorrect");
                }
            });
        };

        RegService.checkPass = function (reg_pass, rep_pass) {
            if (reg_pass == rep_pass) {
                model.reg_user.pass_equal = 0;
            } else {
                model.reg_user.pass_equal = 1;
            }
        };

        RegService.register = function (user) {

            var condition = model.reg_user.nick       == 0 &&
                            model.reg_user.email      == 0 &&
                            model.reg_user.pass_equal == 0;

            if (condition) {
                /**
                 * Recieve user Id and session token from server;
                 * Store them temporary into 'data':
                 * 'id' - user id, 'value' - token.
                 */
                $http.post("./php/register.php", user).success(function(data) {
                    SessionService.set("uid", data.value);

                    $location.path('/user_' + data.id + '/blocks').replace();
                    
                    UserService.set(data.id);
                    $rootScope.user = UserService.get();
                });
            }
        };

        return RegService;

    }]);