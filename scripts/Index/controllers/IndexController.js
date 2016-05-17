angular.module("testApp")

    .controller("IndexController", function ($scope, $http, $rootScope, EnterService) {

        /**
         * Обработчик клика по кнопке входа.
         */
        $scope.enter_click_handler = function () {
            open_enter_form();
        };

        /**
         * Обработчик клика по кнопке регистрации.
         */
        $scope.register_click_handler = function () {
            open_reg_form();
        };

        var open_enter_form = function() {
            $rootScope.view = './views/enter.html';
        };

        var open_reg_form = function() {
            $rootScope.view = './views/register.html';
        };


        $scope.logout = function() {
            EnterService.logout();
        };
    });