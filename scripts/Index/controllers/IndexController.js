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

        /**
         * Обработчик клика по кнопке "Пользователи".
         */
        $scope.show_users_click_handler = function () {
            show_users();
        };

        /**
         * Обработчик клика по кнопке "Парсер переменных".
         */
        $scope.show_parser_click_handler = function () {
            show_parser();
        };

        var show_parser = function () {
            $rootScope.view = './views/parser.html';
        };

        var show_users = function() {
            $rootScope.view = './views/user_list.html';
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