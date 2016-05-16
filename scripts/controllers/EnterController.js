angular.module("testApp")
    .controller("EnterController", ['$scope', 'EnterService', function ($scope, EnterService) {
        this.enter = function () {
            /**
             * Добавляем объект с данными пользователя в модель
             */
            var enter_user = {"email"    : $scope.ent_email,
                              "password" : $scope.ent_pass};

            EnterService.login(enter_user);
        };
    }]);