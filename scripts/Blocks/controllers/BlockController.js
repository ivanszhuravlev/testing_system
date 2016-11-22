angular.module("testApp")

.controller("BlockController", function ($scope, BlocksService, UserService, $routeParams, $rootScope, $location, UserModel, $anchorScroll, $window) {
    var block_prom = BlocksService.getBlock($routeParams.blockId);
//    $scope.game_path = "./game/index.html";

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
        if ($scope.questions[id + 1] && $scope.questions[id + 1].ifnot) {
            if (!$scope.questions[id].user_answers[$scope.questions[id].id].value || $scope.questions[id].user_answers[$scope.questions[id].id].value == $scope.questions[id + 1].ifnot.prev_val) {
                $scope.questions[id + 1].user_answers[$scope.questions[id + 1].id] = $scope.questions[id + 1].ifnot.default_val;
            } else {
                $scope.questions[id + 1].user_answers[$scope.questions[id + 1].id] = "";
            }
        }
        if ($scope.questions[id + 2] && $scope.questions[id + 2].ifnot) {
            $scope.make_default(id + 1);
        }
    };
    
    $scope.show_error = function(field_id) {
        var field = document.getElementById(field_id);
        field.setAttribute('max', 239);
        console.log(field_id);
        console.log(field.getAttribute('max'));
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
        $scope.results_page = "";

        if ($scope.block.content_id == 9 && $routeParams.pageId >= 35) {
            BlocksService.getResults($rootScope.user).success(function(result){
                $scope.test_result = result;
//                console.log(result);
            });

            BlocksService.getDrugAnswers($rootScope.user).success(function(answers){
//                console.log(answers);
                if (answers.idrug_q5 == 1 && answers.idrug_q6 == 1) {
                    switch($routeParams.pageId) {
                        case "35":
                            $scope.results_page = "./views/intervention/part_1_results.html";
                            break;
                        case "36":
                            $scope.results_page = "./views/intervention/part_2.html";
                            break;
                        case "37":
                            $scope.results_page = "./views/intervention/part_7.html";
                            break;
                        case "38":
                            $scope.results_page = "./views/intervention/part_3.html";
                            break;
                        case "39":
                            $scope.results_page = "./views/intervention/part_4.html";
                            break;
                        case "40":
                            $scope.results_page = "./views/intervention/part_5.html";
                            break;
                        case "41":
                            $scope.results_page = "./views/intervention/part_6.html";
                            break;
                    }
                }

                if (answers.idrug_q5 == 1 && answers.idrug_q6 != 1) {
                    switch($routeParams.pageId) {
                        case "35":
                            $scope.results_page = "./views/intervention/part_1_results.html";
                            break;
                        case "36":
                            $scope.results_page = "./views/intervention/part_2.html";
                            break;
                        case "37":
                            $scope.results_page = "./views/intervention/part_3.html";
                            break;
                        case "38":
                            $scope.results_page = "./views/intervention/part_4.html";
                            break;
                        case "39":
                            $scope.results_page = "./views/intervention/part_5.html";
                            break;
                        case "40":
                            $scope.results_page = "./views/intervention/part_7.html";
                            break;
                        case "41":
                            $scope.results_page = "./views/intervention/part_6.html";
                            break;
                    }
                }
                
                if (answers.idrug_q5 !=1 || answers.idrug_q5 == null) {
                    switch($routeParams.pageId) {
                        case "35":
                            $scope.results_page = "./views/intervention/part_1_results.html";
                            break;
                        case "36":
                            $scope.results_page = "./views/intervention/part_2.html";
                            break;
                        case "37":
                            $scope.results_page = "./views/intervention/part_3.html";
                            break;
                        case "38":
                            $scope.results_page = "./views/intervention/part_4.html";
                            break;
                        case "39":
                            $scope.results_page = "./views/intervention/part_5.html";
                            break;
                        case "40":
                            var block_id = $routeParams.blockId >= 8 ? $scope.block.content_id : $routeParams.blockId;

                            UserService.updatePage($rootScope.user, block_id).success(function (new_page) {
                                $rootScope.user.block = new_page.block;
                                $rootScope.user.page  = new_page.page;
                                $location.path(
                                    '/user_' + $rootScope.user.id +
                                    '/block_' + $rootScope.user.block +
                                    '/' + $rootScope.user.page
                                ).replace();
                            });
                            break;
                        case "41":
                            $scope.results_page = "./views/intervention/part_6.html";
                            break;
                    }
                }
            });
        }

        if ($scope.block.content_id == 9 && $routeParams.pageId % 2 === 0) {
            var interv_answer_prom = BlocksService.getAnswerPage($routeParams.pageId);

            interv_answer_prom.success(function (html_text) {
                $scope.html_text = html_text;
                console.log($scope.html_text);
            });
        } else {
            var questions_prom = BlocksService.getQuestions(block.content_id, block.id, $routeParams.pageId, UserModel.user);

            questions_prom.success(function (questions) {
                var keys = Object.keys(questions),
                    block_id = $routeParams.blockId >= 8 ? $scope.block.content_id : $routeParams.blockId;
//                console.log(JSON.stringify(keys));
                if (JSON.stringify(keys) == "[]") {
                    UserService.updatePage($rootScope.user, block_id).success(function (new_page) {
                        $rootScope.user.block = new_page.block;
                        $rootScope.user.page  = new_page.page;
                        $location.path(
                            '/user_' + $rootScope.user.id +
                            '/block_' + $rootScope.user.block +
                            '/' + $rootScope.user.page
                        ).replace();
                    });
                }

                keys.sort();
                for (var i in keys) {
                    questions[keys[i]].key = keys[i].replace(/(^0)/, "");
                    questions[keys[i]].key = questions[keys[i]].key.replace(/\.(0)/, ".");
                    $scope.questions.push(questions[keys[i]]);
                }
                $scope.found_table = BlocksService.find_table($scope.questions);

                $scope.questions.forEach(function(question){
                    question.user_answers = {};
                    var mask;
                    if (question.options && question.options.indexOf('ifnot') === 0) {
                        mask = /ifnot_previous_(\d+)_(\w+)/;
                        var ifnot = mask.exec(  question.options.trim() );
                        question.ifnot = {
                            prev_val: ifnot[1],
                            default_val: ifnot[2] 
                        };
                    }

                    if (question.options && question.options.indexOf('img') === 0) {
                        mask = /img_top_(\w+.\w+)_(auto|\d+px)_(auto|\d+px)/;
                        var img = mask.exec(  question.options.trim() );
                        question.img = {
                            src: img[1],
                            style: {
                                'width': img[2],
                                'height': img[3],
                                'margin-bottom': "30px",
                            }
                        };
                    }

                });

                BlocksService.getBlocks().success(function(data){
                    var pages = BlocksService.getPagesNum(data),
                        current_page = BlocksService.getCurrentPage(data, $rootScope.user.block, $rootScope.user.page),
                        progress = BlocksService.countProgress(pages, current_page);

                    $rootScope.progress = { width : progress + "%" };
                });

            });
        }
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
//                        console.log(id);
                            result_multiple.push({
                                id: id,
                                qid: questions[q_index].id,
                                value: 1,
//                                options: questions[q_index].answers[a_index][id].options
                            });
                        }

                        if (typeof questions[q_index].user_answers[a_index][id] == 'string') {
                            result_multiple.push({
                                id: id,
                                qid: questions[q_index].id,
                                value: questions[q_index].user_answers[a_index][id],
                                options: ""
                            });
                        }
                    }
                }
            }

        }

        var block_id = $routeParams.blockId >= 8 ? $scope.block.content_id : $routeParams.blockId;

        BlocksService.saveResult(result, result_multiple, $rootScope.user.id, $routeParams.blockId).success(function (response) {
            BlocksService.calculate($routeParams.blockId, $routeParams.pageId, $scope.questions, $rootScope.user).success(function (calc_response) {
                var is_right;

                if(calc_response && calc_response[0] && calc_response[0].is_right){
                    is_right = calc_response[0].is_right;
                } else {
                    is_right = null;
                }

                UserService.saveIsRight($rootScope.user.id, is_right).success(function(new_is_right){
                    if (response == "pass") {
                        UserService.getUser($rootScope.user.id).success(function (new_user_data) {
                            $rootScope.user.block    = new_user_data.block;
                            $rootScope.user.page     = new_user_data.page;
                            $rootScope.user.is_right = new_is_right;

                            $location.path('/user_' + $rootScope.user.id +
                                '/block_' + $rootScope.user.block +
                                '/' + $rootScope.user.page).replace();
                        });
                    } else {
                        UserService.updatePage($rootScope.user, block_id).success(function (new_page) {
                            $rootScope.user.block = new_page.block;
                            $rootScope.user.page  = new_page.page;
                            $rootScope.user.is_right = new_is_right;

                            $location.path('/user_' + $rootScope.user.id +
                                '/block_' + $rootScope.user.block +
                                '/' + $rootScope.user.page).replace();
                        });
                    }
                });
            });
        });
    };

    $scope.finish = function(){
        UserService.updateVisit(UserModel.user).success(function(){
//            $location.path('/user_' + $rootScope.user.id + '/blocks').replace();
            $window.location.href = '/user_' + $rootScope.user.id + '/blocks';
        });
    };

    $scope.go_back = function () {
        console.log($rootScope.user.block + " " + $rootScope.user.page);
        BlocksService.goBack($rootScope.user).success(function (new_page) {
            $rootScope.user.block = new_page.block;
            $rootScope.user.page  = new_page.page;
            $location.path('/user_' + $rootScope.user.id +
                '/block_' + $rootScope.user.block +
                '/' + $rootScope.user.page).replace();
        });
    };

    /*
     * Показываем следующий вопрос первого блока интервенции
     */
    $scope.next_question = function() {
        var block_id = $routeParams.blockId >= 8 ? $scope.block.content_id : $routeParams.blockId;

        UserService.updatePage($rootScope.user, block_id).success(function (new_page) {
            $rootScope.user.block = new_page.block;
            $rootScope.user.page  = new_page.page;
            $location.path(
                '/user_' + $rootScope.user.id +
                '/block_' + $rootScope.user.block +
                '/' + $rootScope.user.page
            ).replace();
        });
    };

    $scope.scrollTo = function(target) {
        $location.hash(target);
        $anchorScroll();
        $location.hash("");
    };

//    $scope.check_max = function(q_index, curr_question) {
//        var prev_question;
//        switch(curr_question.name) {
//            case "sexvagsafe":
//                prev_question = $scope.questions[q_index - 1];
//                if (curr_question.user_answers[curr_question.id] > prev_question.user_answers[prev_question.id]) {
//                    curr_question.error = "must_be_less";
//                } else {
//                    $scope.error[q_index] = "";
//                }
//        }
//    };

    $rootScope.compare = function(a1, a2) {
        return a1.length == a2.length && a1.every((v,i)=>v === a2[i]);
    };
});