angular.module("testApp")

    .controller("ParserController", function ($scope) {
        $scope.name = "";
        $scope.block = "";
        $scope.id = "";
        $scope.stage = "";

        this.parseVariable = function(variable) {
            var template = /([A-Za-z]+)_(\w{2})(\w{2})(\w{1,2})/;
            var result = template.exec(variable.trim());
            $scope.name  = result[1];
            $scope.block = result[2];
            $scope.id    = result[3];
            $scope.stage = result[4];
        };
    });