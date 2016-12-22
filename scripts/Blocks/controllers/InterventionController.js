angular.module("testApp")

.controller("InterventionController", function ($scope, BlocksService, UserService, $routeParams, $rootScope, $location, UserModel, $anchorScroll, $window, $cacheFactory) {
    var $httpDefaultCache = $cacheFactory.get('$http');

    $scope.results_page = "";

    $scope.current_page = {};

    $scope.parts = [];

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

        if (answers.idrug_q5 == 1 && answers.idrug_q6 == 1) {
                $scope.parts = [
                    { name: "Знания", id: 35 },
                    { name: "Принятие диагноза", id: 36 },
                    { name: "Употребление наркотиков", id: 41},
                    { name: "Сексуальные отношения", id: 37 },
                    { name: "Правовые вопросы", id: 38 },
                    { name: "Приверженность к лечению", id: 39 },
                    { name: "Образ жизни", id: 40 }
                ];
        }

        if (answers.idrug_q5 == 1 && answers.idrug_q6 != 1) {
            $scope.parts = [
                { name: "Знания", id: 35 },
                { name: "Принятие диагноза", id: 36 },
                { name: "Сексуальные отношения", id: 37 },
                { name: "Правовые вопросы", id: 38 },
                { name: "Приверженность к лечению", id: 39 },
                { name: "Употребление наркотиков", id: 41},
                { name: "Образ жизни", id: 40 }
            ];
        }

        if (answers.idrug_q5 !=1 || answers.idrug_q5 == null) {
            $scope.parts = [
                { name: "Знания", id: 35 },
                { name: "Принятие диагноза", id: 36 },
                { name: "Сексуальные отношения", id: 37 },
                { name: "Правовые вопросы", id: 38 },
                { name: "Приверженность к лечению", id: 39 },
                { name: "Образ жизни", id: 40 }
            ];
        }

        for (var part_id in $scope.parts) {
            var part = $scope.parts[part_id];

            if (part.id == $routeParams.pageId) {
                $scope.current_page.id = part.id;
                $scope.current_page.index = parseInt(part_id) + 1;
            }
        }
        this.current_page = $scope.current_page;
    });

    $scope.next_question = function() {
        UserService.saveHaveSeen($rootScope.user, false).success(function(){
            UserService.updatePage($rootScope.user, $rootScope.user.block).success(function (new_page) {
                $rootScope.user.block = new_page.block;
                $rootScope.user.page  = new_page.page;
                $location.path(
                    '/user_' + $rootScope.user.id +
                    '/block_' + $rootScope.user.block +
                    '/' + $rootScope.user.page
                ).replace();
            });
        });
    };

    $scope.redirect_to_blocks = function() {
//        alert("redirect");
        $window.location.href = '/user_' + $rootScope.user.id + '/blocks';
        $httpDefaultCache.removeAll();
    };

    $scope.save_have_seen = function(user, accepted) {
        UserService.saveHaveSeen(user, accepted);
    };
});