angular.module('testApp', ['ngRoute'])
    .run(function(SessionService, $rootScope, UserService, $location) {
            var connected = SessionService.check();

            connected.then(function(message) {

                if (!message.data) {
                    $location.path('/').replace();;
                } else {
                    var id = localStorage.getItem('user_id');

                    UserService.set(id);

                    $rootScope.user = UserService.get();
                }
            });
    })
    .config(['$routeProvider', '$locationProvider',
        function($routeProvider, $locationProvider) {
            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });

            $routeProvider
                .when('/', {
                    templateUrl: './views/index.html'
                })
                .when('/enter', {
                    templateUrl: './views/enter.html',
                    controller: 'EnterController',
                    controllerAs: 'enter_controller'
                })
                .when('/register', {
                    templateUrl: './views/register.html',
                    controller: 'RegController',
                    controllerAs: 'reg_controller'
                })
                .when('/user_:userId/blocks', {
                    templateUrl: './views/blocks.html',
                    controller: 'BlocksController',
                    controllerAs: 'blocks_controller'
                })
                .when('/user_:userId/block_:blockId/:pageId', {
                    templateUrl: './views/block.html',
                    controller: 'BlockController',
                    controllerAs: 'block_controller'
                })
                .when('/user_:userId/parser', {
                    templateUrl: './views/parser.html',
                    controller: 'ParserController',
                    controllerAs: 'parser_controller'
                })
                .when('/user_:userId/users_list', {
                    templateUrl: './views/user_list.html',
                    controller: 'UserListController'
                })
                .when('/user_:userId/users_answers', {
                    templateUrl: './views/users_answers.html',
                    controller: 'UsersAnswersController',
                    controllerAs: 'users_answers_controller'
                })
                .when('/user_:userId', {
                    redirectTo: '/user_:userId/blocks'
                })
                .otherwise({
                    redirectTo: '/'
                });
        }]);