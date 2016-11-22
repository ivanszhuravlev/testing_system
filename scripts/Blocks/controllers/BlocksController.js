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

        BlocksService.getBlocks().success(function(data) {
            $rootScope.blocks = data;

            var pages = BlocksService.getPagesNum($rootScope.blocks),
                current_page = BlocksService.getCurrentPage($rootScope.blocks, $rootScope.user.block, $rootScope.user.page),
                progress = BlocksService.countProgress(pages, current_page - 1);

            $rootScope.progress = { width : progress + "%" };
        });

        $scope.returnToTest = function(user) {
            UserService.makeSuitable(user).success(function(){
                BlocksService.goBack(user).success(function() {
                    UserService.set(user.id).then(function () {
                        $location.path('/user_' + user.id +
                            '/block_' + user.block +
                            '/' + user.page).replace();
                    });
                });
            });
        };

        $scope.skip_visit = function(user) {
            UserService.skipVisit(user).success(function(){
                location.reload();
            });
        };

    });