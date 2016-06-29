"use strict";

angular.module('testApp')
    .factory('UserService', ['$http', 'UserModel', function($http, UserModel) {
        return {
            get : function() {
                return UserModel.user;
            },

            getList : function() {
                return $http.get('./php/user/get_list.php');
            },

            set : function(id) {
                return $http.post('./php/user/get.php', { id : id }).success(function(data) {
                    localStorage.setItem('user_id', id);

                    UserModel.user.id    = id;
                    UserModel.user.email = data.email;
                    UserModel.user.nick  = data.nickname;
                    UserModel.user.stage = data.stage;
                    UserModel.user.block = data.block;
                    UserModel.user.page  = data.page;

                    if (data.nickname == "ivan" || data.nickname == "admin") {
                        UserModel.user.is_admin = 1;
                    }
                });
            },

            updatePage : function(user, block_id) {
                return $http.post('./php/user/update_page.php', { user : user, block_id : block_id});
            },

            logout : function() {
                UserModel.user.id       = 0;
                UserModel.user.email    = "";
                UserModel.user.nick     = "";
                UserModel.user.stage    = 0;
                UserModel.user.block    = 0;
                UserModel.user.page     = 0;
                UserModel.user.is_admin = 0;

                localStorage.removeItem('user_id');
            }
        };
    }]);