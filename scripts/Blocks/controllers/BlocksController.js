angular.module("testApp")

    .controller("BlocksController", function ($scope, BlocksService) {
        var ids_prom = BlocksService.getIds();
        $scope.blocks = [];

        ids_prom.success(function(ids) {
            BlocksService.getBlocks(ids).success(function(data) {
                $scope.blocks = data;
            });
        });
    });