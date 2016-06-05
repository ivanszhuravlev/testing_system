"use strict";

angular.module('testApp')
    .constant('ParserMasks', {
        var : /([A-Za-z]+)_\w(\d)\w(\d)(\w{1,2})/,
        answ_id : /\((\d+)\)$/,
        remove_number : /^\w+\.\s/,
        num_field : /(\s_{3})/
    });