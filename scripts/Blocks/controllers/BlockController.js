angular.module("testApp")

    .controller("BlockController", function ($scope, BlocksService, $routeParams) {
        var questions_prom = BlocksService.getQuestions($routeParams.blockId);
        var block_prom     = BlocksService.getBlock($routeParams.blockId);

        $scope.questions = [];

        $scope.block = {
            id : $routeParams.blockId,
            name : ''
        };

        questions_prom.success(function(questions) {
            $scope.questions = questions;
        });

        block_prom.success(function(name) {
            $scope.block.name = name;
            console.log($scope.block);
        });
    });