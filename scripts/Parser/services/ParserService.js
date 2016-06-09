"use strict";

angular.module('testApp')
    .factory('ParserService', ['$http', 'ParserMasks', function($http, ParserMasks) {
        
        var mask = ParserMasks;
        
        return {
            parse_var : function (variable) {
                var result = mask.var.exec(variable.trim());
                
                return result;
            },
            
            parse_rows : function (rows_unparsed) {
                var id_arr = [],
                    rows = rows_unparsed.trim().split(/\n/),
                    question = {};
            
                question.text    = rows[0].replace(mask.remove_number, '');
                question.answers = [];
                question.symbols = 0;

                rows.shift();
                
                if (rows.length > 0) {
                    rows.forEach(function (row, i) {
                        id_arr = mask.answ_id.exec(row.trim());
                        question.answers.push({
                            id: id_arr[1],
                            text: row.replace(id_arr[0], '').trim()
                        });
                    });
                } else {
//                    console.log("sux:" + mask.num_field.test(question.text));
                    while (mask.num_field.test(question.text)) {
                        question.symbols += 1;
                        question.text = question.text.replace(mask.num_field, '');
                    }
                    console.log(question.text);
                    console.log(question.symbols);
                }
                
                return question;
            },
            
            save : function (question) {
                $http.post('./php/parser/save.php', { question : question }).success(function(data) {
                    console.log(data);
                });
            }
        };
    }]);