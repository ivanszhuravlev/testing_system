angular.module("testApp")
    .controller("RegController", ['$scope', '$http', 'RegService', function ($scope, $http, RegService) {

       // var nickname_field = document.getElementById("nickname");
        var email_field = document.getElementById("reg_email");

   //     this.checkNick = function() {
  //          RegService.checkNick(nickname_field, $scope.nickname);
  //      };

        this.checkEmail = function() {
            RegService.checkEmail(email_field, $scope.reg_email);
        };

        this.checkPass = function() {
            RegService.checkPass($scope.reg_pass, $scope.rep_pass);
        };

        this.register = function() {
            var user = {
                nickname: $scope.nickname,
                email: $scope.reg_email,
                password: $scope.reg_pass,
                repeat_password: $scope.rep_pass
            };

            RegService.register(user);
        };

    }]);
