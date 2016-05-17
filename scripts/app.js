angular.module('testApp')
    .run(function(SessionService, $rootScope, UserService) {
        var connected = SessionService.check();

        connected.then(function(message) {

            if (!message.data) {
                $rootScope.view = './views/welcome.html';
                $rootScope.nav = '';
                $rootScope.auth = './views/login_panel.html';
            } else {
                $rootScope.view = './views/blocks.html';
                $rootScope.nav = './views/nav.html';
                $rootScope.auth = './views/logout_panel.html';

                var id = localStorage.getItem('user_id');

                UserService.set(id);

                $rootScope.user = UserService.get();
            }
        });
    });