"use strict";

angular.module('testApp')
    .factory('BlocksService', ['$http', function($http) {
        return {
            getBlocks : function() {
                return $http.get('./php/blocks/get_blocks.php');
            }

        };
    }]);