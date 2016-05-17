var model = {
    user : {
        id       : 0,
        nick     : "",
        email    : "",
        is_admin : 0
    }
};

angular.module('testApp')
    .value('UserModel', model);