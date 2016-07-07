angular.module("testApp")

.controller("BlockController", function ($scope, BlocksService, UserService, $routeParams, $rootScope, $location, UserModel) {
    var block_prom = BlocksService.getBlock($routeParams.blockId);

    if (UserModel.user.suits === 0) {
        $location.path('/user_' + $rootScope.user.id + '/');
    }

    $scope.questions = [];
    $scope.answers = {};

    /**
     * Contains two indexes: the beginning and the end of table;
     * If there is no table in questions array, then 
     * both indexes are equal to 0.
     *
     **/
    $scope.found_table = [];

    $scope.block = {
        id: $routeParams.blockId,
        name: '',
        content_id: 0
    };

    block_prom.success(function (block) {
        $scope.block.name = block.name;
        $scope.block.content_id = block.content_id;

        var questions_prom = BlocksService.getQuestions(block.content_id, block.id, $routeParams.pageId);

        questions_prom.success(function (questions) {
            var keys = Object.keys(questions);
            keys.sort();
            console.log(keys);
            for (var i in keys) {
                $scope.questions.push(questions[keys[i]]);
            }
            $scope.found_table = BlocksService.find_table(questions);
            console.log($scope.found_table);
            console.log(questions);
        });
    });

    $scope.block_submit = function (answers) {
        var result = [];
        for (var id in answers)
            result.push({
                id: id,
                value: answers[id]
            });

        BlocksService.saveResult(result, $rootScope.user.id).success(function () {
            UserService.updatePage($rootScope.user, $routeParams.blockId).success(function () {
                UserService.set($rootScope.user.id).then(function () {
                    $location.path('/user_' + $rootScope.user.id +
                        '/block_' + $rootScope.user.block +
                        '/' + $rootScope.user.page).replace();
                });
            });
        });
    };
});