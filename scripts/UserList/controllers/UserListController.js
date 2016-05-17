angular.module("testApp")

    .controller("UserListController", function ($scope, $rootScope, UserService) {
        var users = UserService.getList();
        users.success(function(data) {
            $scope.users = data;
        });

    });