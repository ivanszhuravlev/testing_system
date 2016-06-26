"use strict";

angular.module('testApp')
    .factory('BlocksService', ['$http', function($http) {
        return {
            getBlocks : function() {
                return $http.get('./php/blocks/get_blocks.php');
            },

            getQuestions : function(content_id, block_id, page_id) {
                return $http.post('./php/blocks/get_questions.php', { 
                    content_id : content_id, 
                    block_id : block_id,
                    page_id : page_id,
                });
            },

            getBlock : function(id) {
                return $http.post('./php/blocks/get_block.php', { id : id });
            }

        };
    }]);