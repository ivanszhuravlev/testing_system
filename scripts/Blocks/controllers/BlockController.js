angular.module("testApp")

    .controller("BlockController", function ($scope, BlocksService, $routeParams) {
        var block_prom = BlocksService.getBlock($routeParams.blockId);

        $scope.questions = [];

        $scope.block = {
            id : $routeParams.blockId,
            name : '',
            content_id : 0
        };

        block_prom.success(function(block) {
            $scope.block.name = block.name;
            $scope.block.content_id = block.content_id;

            var questions_prom = BlocksService.getQuestions(block.content_id, block.id, $routeParams.pageId);

            questions_prom.success(function(questions) {
                $scope.questions = questions;
            });
        });
    });