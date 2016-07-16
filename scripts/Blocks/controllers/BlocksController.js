    angular.module("testApp")

    .controller("BlocksController", function ($scope, BlocksService, $rootScope) {
        $scope.blocks = [];

        BlocksService.getBlocks().success(function(data) {
            $scope.blocks = data;
        });
    });