angular.module('testApp')
    .run(function(SessionService, $rootScope) {
        var connected = SessionService.check();

        connected.then(function(message) {
            console.log(message);
            if (!message.data) {
                $rootScope.view = './views/welcome.html';
                $rootScope.nav = '';
                $rootScope.auth = './views/login_panel.html';
            } else {
                $rootScope.view = './views/blocks.html';
                $rootScope.nav = './views/nav.html';
                $rootScope.auth = './views/logout_panel.html';
            }
        });
    });