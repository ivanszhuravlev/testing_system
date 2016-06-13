angular.module("testApp")

    .controller("ParserController", function ($scope, ParserService) {
        var question = {};
        $scope.question = {};

        this.parseAll = function(variable, rows_unparsed) {
            var result_var  = ParserService.parse_var(variable),
                result_rows = ParserService.parse_rows(rows_unparsed);

            question.name    = result_var[1];
            question.s       = result_var[2];
            question.q       = result_var[3];
            question.v       = result_var[4] == "b" ? "0" : result_var[4][1];
            question.text    = result_rows.text;
            question.answers = result_rows.answers;
            question.symbols = result_rows.symbols;

            $scope.question = question;

            ParserService.save(question);

            $scope.variable = "";
            $scope.rows_unparsed = "";
        };
    });