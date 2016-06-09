angular.module("testApp")

    .controller("BlockController", function ($scope, BlocksService, $routeParams) {
        var questions_prom = BlocksService.getQuestions($routeParams.blockId);
        $scope.questions = [];

        questions_prom.success(function(questions) {
            $scope.questions = questions;
        });
    });