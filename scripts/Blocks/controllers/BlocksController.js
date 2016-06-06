angular.module("testApp")

    .controller("BlocksController", function ($scope, BlocksService) {
//        var question = {};
//        $scope.question = {};
//
//        this.parseAll = function(variable, rows_unparsed) {
//            var result_var  = ParserService.parse_var(variable),
//                result_rows = ParserService.parse_rows(rows_unparsed);
//
//            question.name    = result_var[1];
//            question.s       = result_var[2];
//            question.q       = result_var[3];
//            question.v       = result_var[4] == "b" ? "0" : result_var[4][1];
//            question.text    = result_rows.text;
//            question.answers = result_rows.answers;
//            question.symbols = result_rows.symbols;
//
//            $scope.question = question;
//
//            ParserService.save(question);
//        };
        var blocks = BlocksService.getBlocks();

        blocks.success(function(data) {
            $scope.blocks = data;
            console.log(data);
        });
    });