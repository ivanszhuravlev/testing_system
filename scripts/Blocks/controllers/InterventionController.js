angular.module("testApp")

.controller("InterventionController", function ($scope, BlocksService, UserService, $routeParams, $rootScope, $location, UserModel, $anchorScroll, $window) {

    $scope.results_page = "";

    $scope.dont_check_reading = true;

    BlocksService.getResults($rootScope.user, parseInt($routeParams.pageId)).success(function(result){
        $scope.test_result = result;
        console.log(result);
    });
    BlocksService.getDrugAnswers($rootScope.user).success(function(answers){
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
                $scope.results_page = "./views/intervention/part_6.html";
                break;
            case "41":
                $scope.results_page = "./views/intervention/part_7.html";
                break;
        }
    });
});