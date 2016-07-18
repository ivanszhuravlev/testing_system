angular.module("testApp")

.controller("UsersAnswersController", function ($scope, UsersAnswersService) {
    UsersAnswersService.get_questions_vars().success(function (vars) {
        UsersAnswersService.get_uids().success(function (uids) {
            UsersAnswersService.get_answers(uids).success(function (answers) {
                var result = UsersAnswersService.make_json(vars, answers)[0];
                var json_answers =  [];
                json_answers.push(result);

                $scope.json_answers = UsersAnswersService.convert_to_csv(JSON.stringify(json_answers));
                $scope.json_answers = 'data:text/csv;charset=utf-8,%EF%BB%BF' + encodeURI($scope.json_answers);
            });
        });
    });

    $scope.download = function() {
         download($scope.json_answers, "hello.csv");
    };
});