    angular.module("testApp")

    .controller("BlocksController", function ($scope, BlocksService, $rootScope, UserService, $location) {
        $scope.blocks = [];
        $scope.parts = [];
        BlocksService.getDrugAnswers($rootScope.user).success(function(answers){
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
        });

        BlocksService.getBlocks().success(function(data){
            var pages = BlocksService.getPagesNum(data),
                current_page = BlocksService.getCurrentPage(data, $rootScope.user.block, $rootScope.user.page),
                progress = BlocksService.countProgress(pages, current_page);

            $rootScope.progress = { width : progress + "%" };
        });

        $scope.returnToTest = function(user) {
            UserService.makeSuitable(user).success(function(){
                BlocksService.goBack(user).success(function(return_to) {
                    $location.path('/user_' + user.id +
                        '/block_' + return_to.block +
                        '/' + return_to.page).replace();
                });
            });
        };

        $scope.next_question = function() {
            UserService.updatePage($rootScope.user, $rootScope.user.block).success(function (new_page) {
                $rootScope.user.block = new_page.block;
                $rootScope.user.page  = new_page.page;
                $location.path(
                    '/user_' + $rootScope.user.id +
                    '/block_' + $rootScope.user.block +
                    '/' + $rootScope.user.page
                ).replace();
            });
        };
    });