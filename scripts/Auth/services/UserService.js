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

            getUser : function(id) {
                return $http.post('./php/user/get.php', { id : id });
            },

            saveIsRight : function(uid, is_right) {
                return $http.post('./php/user/save_is_right.php', { uid : uid, is_right : is_right });
            },

            set : function(data) {
//                promise.success(function(data) {
                    localStorage.setItem('user_id', data.id);

                    UserModel.user.id       = data.id;
                    UserModel.user.email    = data.email;
                    UserModel.user.nick     = data.nickname;
                    UserModel.user.visit    = data.visit;
                    UserModel.user.block    = data.block;
                    UserModel.user.page     = data.page;
                    UserModel.user.suits    = data.suits;
                    UserModel.user.is_admin = data.is_admin;
                    UserModel.user.date_reg = data.date_reg;
                    UserModel.user.date_v1  = data.date_v1 ? data.date_v1 : 0;
                    UserModel.user.date_v2  = data.date_v2 ? data.date_v2 : 0;
                    UserModel.user.date_v3  = data.date_v3 ? data.date_v3 : 0;
                    UserModel.user.is_right = data.is_right;

                    if (data.diff_v2 || data.diff_v3) {
                        UserModel.user.diff_v2 = data.diff_v2;
                        UserModel.user.diff_v3 = data.diff_v3;
                    }

                    return UserModel.user;
//                });
            },

            updatePage : function(user, block_id) {
                return $http.post('./php/user/update_page.php', { user : user, block_id : block_id});
            },

            updateVisit : function(user) {
                return $http.post('./php/user/update_visit.php', { user : user });
            },

            logout : function() {
                UserModel.user.id       = 0;
                UserModel.user.email    = "";
                UserModel.user.nick     = "";
                UserModel.user.visit    = 0;
                UserModel.user.block    = 0;
                UserModel.user.page     = 0;
                UserModel.user.is_admin = 0;
                UserModel.user.suits    = 0;
                UserModel.user.date_reg = 0;
                UserModel.user.date_v1  = 0;
                UserModel.user.date_v2  = 0;
                UserModel.user.date_v3  = 0;

                if (UserModel.user.diff_v2 || UserModel.user.diff_v3) {
                    UserModel.user.diff_v2 = 0;
                    UserModel.user.diff_v3 = 0;
                }

                localStorage.removeItem('user_id');
            },

            makeSuitable : function(user) {
                return $http.post('./php/user/make_suitable.php', { user : user });
            }
        };
    }]);