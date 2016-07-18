"use strict";

angular.module('testApp')
    .factory('UsersAnswersService', ['$http', function($http) {
        return {
            get_questions_vars : function () {
                return $http.get("./php/users_answers/get_questions_vars.php");
            },

            get_uids : function () {
                return $http.get("./php/users_answers/get_uids.php");
            },

            get_answers : function (ids) {
                return $http.post("./php/users_answers/get_answers.php", { ids : ids });
            },

            make_json : function (vars, answers) {
                var result = [];

                for (var a_index in answers) {
                    var row = { "Пользователь (id)" : a_index };

                    for (var v_index in vars) {
                        var variable = vars[v_index];

                        row[variable['var']] = answers[a_index][variable['id']];
//                        row[variable['var']] = answers[a_index];

                    }
                    result.push(row);
                }

                return result;
            },

            convert_to_csv : function(objArray) {
                return Papa.unparse(objArray, {
                    quotes: false,
                    delimiter: ",",
                    newline: "\r\n"
                });
            }
        };
    }]);