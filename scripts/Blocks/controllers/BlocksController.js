    angular.module("testApp")

    .controller("BlocksController", function ($scope, BlocksService, $rootScope) {
        $scope.blocks = [];

        BlocksService.getBlocks().success(function(data) {
            $scope.blocks = data;

            var pages = BlocksService.getPagesNum($scope.blocks),
                current_page = BlocksService.getCurrentPage($scope.blocks, $rootScope.user.block, $rootScope.user.page),
                progress = BlocksService.countProgress(pages, current_page - 1);
            
            $scope.progress = { width : progress + "%" };
        });

    });