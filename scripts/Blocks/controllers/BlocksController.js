    angular.module("testApp")

    .controller("BlocksController", function ($scope, BlocksService, $rootScope) {
        $scope.blocks = [];

        BlocksService.getBlocks().success(function(data) {
            $rootScope.blocks = data;

            var pages = BlocksService.getPagesNum($rootScope.blocks),
                current_page = BlocksService.getCurrentPage($rootScope.blocks, $rootScope.user.block, $rootScope.user.page),
                progress = BlocksService.countProgress(pages, current_page - 1);
            
            $rootScope.progress = { width : progress + "%" };
        });

    });