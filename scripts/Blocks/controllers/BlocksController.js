    angular.module("testApp")

    .controller("BlocksController", function ($scope, BlocksService, $rootScope, UserService, $location) {
        $scope.blocks = [];

        $scope.parts = [
            { name: "Знания", id: 35 },
            { name: "Принятие диагноза", id: 36 },
            { name: "Сексуальные отношения", id: 37 },
            { name: "Правовые вопросы", id: 38 },
            { name: "Приверженность к лечению", id: 39 },
            { name: "Образ жизни", id: 40 },
            { name: "Употребление наркотиков", id: 41}
        ];

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
    });