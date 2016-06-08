var model = {
    user : {
        id       : 0,
        nick     : "",
        email    : "",
        stage    : 0,
        block    : 0,
        is_admin : 0
    }
};

angular.module('testApp')
    .value('UserModel', model);