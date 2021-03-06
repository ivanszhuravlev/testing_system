angular.module('testApp')
    .factory('RegService', ['$http', 'RegValues', '$rootScope', 'SessionService', 'UserService', '$location',
                            function ($http, RegValues, $rootScope, SessionService, UserService, $location) {

        var RegService = {};
        var model = RegValues;

  /*      RegService.checkNick = function (field, nickname) {
//            $http.post("./php/check_nick.php", { nickname : nickname }).success(function(data) {
//                if (data == "0") {
//                    model.reg_user.nick = 0;
//                    field.classList.remove("incorrect");
//                    field.classList.add("correct");
//                } else {
//                    model.reg_user.nick = 1;
//                    field.classList.remove("correct");
//                    field.classList.add("incorrect");
//                }
//            });
            model.reg_user.nick = 0;
        };
*/
        RegService.checkEmail = function (field, email) {
            $http.post("./php/check_email.php", { email : email }).success(function(data) {

                if (data == "0") {
                    model.reg_user.email = 0;
                    field.classList.remove("incorrect");
                    field.classList.add("correct");
                } 
				else if(data == "2") {
                    model.reg_user.email = 2;				
                }
				else {
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
				 reg_pass.classList.remove("correct");
                 reg_pass.classList.add("incorrect");
				 rep_pass.classList.remove("correct");
                 rep_pass.classList.add("incorrect");				 
				
            }
        };

        RegService.register = function (user) {
            var condition = model.reg_user.email      == 0 &&
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
                    $rootScope.user = {};
                    UserService.getUser(data.id).success(function(user){
                        $rootScope.user = UserService.set(user);
                        $rootScope.user.page = parseInt($rootScope.user.page);
                    });
                });
            }
			else if (model.reg_user.pass_equal == 1) {
			 reg_pass.classList.add("incorrect");	
			 
			 rep_pass.classList.add("incorrect");	
			document.getElementById("status").innerHTML = "Пароли не совпадают";
			}
			else if (model.reg_user.email == 1) {
				
                    reg_email.classList.remove("correct");
                    reg_email.classList.add("incorrect");	
				document.getElementById("status").innerHTML = "E-mail уже используется";
			}
			else if (model.reg_user.email == 2) {
			
                    reg_email.classList.remove("correct");
                    reg_email.classList.add("incorrect");	
				document.getElementById("status").innerHTML = "Неверный E-mail";
			}
        };

        return RegService;

    }]);