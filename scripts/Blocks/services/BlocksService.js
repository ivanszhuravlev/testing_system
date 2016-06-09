"use strict";

angular.module('testApp')
    .factory('BlocksService', ['$http', function($http) {
        return {
            getIds : function() {
                return $http.get('./php/blocks/get_ids.php');
            },

            getBlocks : function(ids) {
                return $http.post('./php/blocks/get_blocks.php', { ids : ids });
            },

            getQuestions : function(block_id) {
                return $http.post('./php/blocks/get_questions.php', { block_id : block_id });
            },

            getBlock : function(id) {
                return $http.post('./php/blocks/get_block.php', { id : id });
            }

        };
    }]);