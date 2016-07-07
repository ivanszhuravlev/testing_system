"use strict";

angular.module('testApp')
    .constant('ParserMasks', {
        var : /([A-Za-z0-9]+)_\w(\d{1,2})\w(\d{1,2})(\w{1,2})/,
        answ_id : /\((\d+)\)$/,
        remove_number : /^(?:\w+\.){1,2}\s/,
        num_field : /(\s_{3})/
    });