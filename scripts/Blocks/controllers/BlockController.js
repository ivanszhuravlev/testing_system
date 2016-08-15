angular.module("testApp")

.controller("BlockController", function ($scope, BlocksService, UserService, $routeParams, $rootScope, $location, UserModel) {
    var block_prom = BlocksService.getBlock($routeParams.blockId);

    if (UserModel.user.suits == 0) {
        $location.path('/user_' + $rootScope.user.id + '/');
    }

    $scope.no_answers = function(id) {
        var answers = $scope.questions[id].user_answers.multiple,
            item;
        for (item in answers) {
            return false;
        }
        return true;
    };

    $scope.reformat_answers = function(id) {
        var answers = $scope.questions[id].user_answers.multiple;

        for (var key in answers) {
            if (answers[key] === undefined) {
                delete answers[key];
            }
        }
    };

    $scope.make_default = function(id) {
        if ($scope.questions[id + 1].ifnot) {
//            alert('success');
            if (!$scope.questions[id].user_answers[$scope.questions[id].id].value || $scope.questions[id].user_answers[$scope.questions[id].id].value == $scope.questions[id + 1].ifnot.prev_val) {
                $scope.questions[id + 1].user_answers[$scope.questions[id + 1].id] = $scope.questions[id + 1].ifnot.default_val;
//                alert($scope.questions[id + 1].user_answers[id + 1]);
            }
//            console.log($scope.questions[id + 1].ifnot);
        }
    };
    
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
            console.log(questions);
            keys.sort();
            for (var i in keys) {
                $scope.questions.push(questions[keys[i]]);
            }
            $scope.found_table = BlocksService.find_table($scope.questions);
//            console.log($scope.questions);
            $scope.questions.forEach(function(question){
                question.user_answers = {};

                if (question.options && question.options.indexOf('ifnot') === 0) {
                    var mask = /ifnot_previous_(\d+)_(\w+)/,
                        ifnot = mask.exec(  question.options.trim());
                    question.ifnot = {
                        prev_val: ifnot[1],
                        default_val: ifnot[2] 
                    };
                }

            });

//            var pages = BlocksService.getPagesNum($rootScope.blocks),
//                current_page = BlocksService.getCurrentPage($rootScope.blocks, $rootScope.user.block, $rootScope.user.page),
//                progress = BlocksService.countProgress(pages, current_page - 1);
//
//            $rootScope.progress = { width : progress + "%" };
        });
    });

    $scope.block_submit = function (questions) {
        var result = [],
            result_multiple = [];
        for (var q_index in questions) {
            for (var a_index in questions[q_index].user_answers) {
                if (a_index != 'multiple') {
                    var value_arr = questions[q_index].user_answers[a_index];
                    if (typeof value_arr == 'object') {
                        result.push({
                            id: a_index,
                            value: value_arr.value,
                            options: value_arr.options
                        });
                    } else {
                        result.push({
                            id: a_index,
                            value: value_arr,
                            options: null
                        });
                    }
                }

                if (a_index == 'multiple') {
                    for (var id in questions[q_index].user_answers[a_index]) {
                        if (questions[q_index].user_answers[a_index][id] === true) {
                        console.log(id);
                            result_multiple.push({
                                id: id,
                                value: 1,
//                                options: questions[q_index].answers[a_index][id].options
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

        BlocksService.saveResult(result, result_multiple, $rootScope.user.id, $routeParams.blockId).success(function (response) {
            if (response == "pass") {
                UserService.set($rootScope.user.id).then(function () {
                    $location.path('/user_' + $rootScope.user.id +
                        '/block_' + $rootScope.user.block +
                        '/' + $rootScope.user.page).replace();
                });
            } else {
                UserService.updatePage($rootScope.user, $routeParams.blockId).success(function () {
                    UserService.set($rootScope.user.id).then(function () {
                        $location.path('/user_' + $rootScope.user.id +
                            '/block_' + $rootScope.user.block +
                            '/' + $rootScope.user.page).replace();
                    });
                });
            }
        });
    };

    $scope.go_back = function () {
        BlocksService.goBack($rootScope.user).success(function (data) {
            UserService.set($rootScope.user.id).then(function () {
                $location.path('/user_' + $rootScope.user.id +
                    '/block_' + $rootScope.user.block +
                    '/' + $rootScope.user.page).replace();
            });
        });
    };
});