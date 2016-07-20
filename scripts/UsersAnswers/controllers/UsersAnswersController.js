angular.module("testApp")

.controller("UsersAnswersController", function ($scope, UsersAnswersService) {
    $scope.download = function() {
        UsersAnswersService.get_questions_vars().success(function (vars) {
            UsersAnswersService.get_uids().success(function (uids) {
                UsersAnswersService.get_answers(uids).success(function (answers) {
                    var result = UsersAnswersService.make_json(vars, answers);
                    var json_answers =  [];
                    result.forEach(function(row){
                        json_answers.push(row);
                    });
                    $scope.json_answers = UsersAnswersService.convert_to_csv(JSON.stringify(json_answers));
                    $scope.json_answers = 'data:text/csv;charset=utf-8,%EF%BB%BF' + encodeURI($scope.json_answers);
//                    console.log($scope.json_answers);
                    download($scope.json_answers, "users_answers.csv");
                });
            });
        });
    };
});