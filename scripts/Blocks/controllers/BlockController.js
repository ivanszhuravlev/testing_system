angular.module("testApp")

.controller("BlockController", function ($scope, BlocksService, UserService, $routeParams, $rootScope, $location, UserModel) {
    var block_prom = BlocksService.getBlock($routeParams.blockId);

    if (UserModel.user.suits == 0) {
        $location.path('/user_' + $rootScope.user.id + '/');
//        console.log("Gotta leave");
    }

    $scope.questions = [];
    $scope.answers = {};
    $scope.multiple_answers = {};

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
            $scope.found_table = BlocksService.find_table($scope.questions);
            $scope.questions.forEach(function(question){
                question.user_answers = {};
            });
        });
    });

    $scope.block_submit = function (questions) {
        var result = [],
            result_multiple = [];

        for (var q_index in questions) {
//            console.log(questions[q_index].user_answers);
            for (var a_index in questions[q_index].user_answers) {
                if (a_index != 'text' && a_index != 'multiple') {
                    result.push({
                        id: a_index,
                        value: questions[q_index].user_answers[a_index],
                        options: questions[q_index].user_answers[a_index].options
                    });
                }

                if (a_index == 'multiple' || a_index == 'text') {
                    for (var id in questions[q_index].user_answers[a_index]) {
                        if (questions[q_index].user_answers[a_index][id] == true) {
                            result_multiple.push({
                                id: id,
                                value: 1,
                                options: questions[q_index].user_answers[a_index][id].options
                            });
                        }

                        if (typeof questions[q_index].user_answers[a_index][id] == 'string') {
                            result_multiple.push({
                                id: id,
                                value: questions[q_index].user_answers[a_index][id],
                                options: ""
                            });
                        }
                    }
                }
            }

        }

        BlocksService.saveResult(result, result_multiple, $rootScope.user.id).success(function (message) {
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