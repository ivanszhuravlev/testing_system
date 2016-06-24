angular.module("testApp")

    .controller("BlocksController", function ($scope, BlocksService) {
        $scope.blocks = [];

        BlocksService.getBlocks().success(function(data) {
            $scope.blocks = data;
        });
    });