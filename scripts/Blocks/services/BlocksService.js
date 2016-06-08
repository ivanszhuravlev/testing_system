"use strict";

angular.module('testApp')
    .factory('BlocksService', ['$http', function($http) {
        return {
            getIds : function() {
                return $http.get('./php/blocks/get_ids.php');
            },

            getBlocks : function(ids) {
                return $http.post('./php/blocks/get_blocks.php', { ids : ids });
            }

        };
    }]);