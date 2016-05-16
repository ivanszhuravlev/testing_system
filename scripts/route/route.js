var testApp = angular.module('testApp', ["ngRoute"])
    .config(function($routeProvider){
        $routeProvider.when('/',
        {
            templateUrl:'../index.html',
            controller:'IndexController'
        });
        $routeProvider.when('/register',
        {
            templateUrl:'../views/register.html',
            controller:'RegisterController'
        });
        $routeProvider.otherwise({redirectTo: '/'});
    });