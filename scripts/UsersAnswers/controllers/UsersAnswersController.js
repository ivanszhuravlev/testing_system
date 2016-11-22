angular.module("testApp")

.controller("UsersAnswersController", function ($scope, UsersAnswersService) {
    $scope.download = function() {
        UsersAnswersService.get_questions_vars().success(function (vars) {
            UsersAnswersService.get_uids().success(function (uids) {
                UsersAnswersService.get_answers(uids).success(function (answers) {
                    var result = UsersAnswersService.make_json(vars, answers);
                    var json_answers =  [];
                    result.sort();
                    result.forEach(function(row){
                        json_answers.push(row);
                    });
                    var result_answers = [],
                        answers_keys = [];

                    for (var user in json_answers) {
                        for (var answer in json_answers[user]) {
                            answers_keys.push(answer);
                            answers_keys.sort();
                        }
                    }

                    answers_keys.unshift(answers_keys[answers_keys.length - 1]);

                    for (var user in json_answers) {
                        result_answers[user] = {};
                        answers_keys.forEach(function(val, i, arr) {
                            result_answers[user][val] = json_answers[user][val];
                        });
                    }

                    $scope.json_answers = UsersAnswersService.convert_to_csv(JSON.stringify(result_answers));

                    $scope.json_answers = 'data:text/csv;charset=utf-8,%EF%BB%BF' + encodeURI($scope.json_answers);

                    download($scope.json_answers, "users_answers.csv");
                });
            });
        });
    };
});

function toArray(obj){ return [].slice.call(obj); }