"use strict";

angular.module('testApp')
    .factory('UserService', ['$http', 'UserModel', '$rootScope', function($http, UserModel) {
        return {
            get : function() {
                return UserModel.user;
            },

            getList : function() {
                return $http.get('./php/user/get_list.php');
            },

            set : function(id) {
                $http.post('./php/user/get.php', { id : id }).success(function(data) {
                    localStorage.setItem('user_id', id);

                    UserModel.user.id    = id;
                    UserModel.user.email = data.email;
                    UserModel.user.nick  = data.nickname;

                    if (data.nickname == "Иванишко") {
                        UserModel.user.is_admin = 1;
                    }
                });
            },

            logout : function() {
                UserModel.user.id       = 0;
                UserModel.user.email    = "";
                UserModel.user.nick     = "";
                UserModel.user.is_admin = 0;

                localStorage.removeItem('user_id');
            }
        };
    }]);