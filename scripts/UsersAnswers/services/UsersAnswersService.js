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

                for (var uid in answers) {
                    var row = { "Пользователь (id)" : uid },
                        answer = answers[uid];

                    for (var v_index in vars) {
                        var variable = vars[v_index],
                            this_answer = answer[variable['id']],
                            order = /\w+?_s(\d{1,2})q(\d{1,2})(.{1,2})/.exec(variable['var']);

                        if (this_answer && this_answer[variable.visit]) {
                            row["(" + v_index + ") " + variable.var] = this_answer[variable.visit]['value'];
                        } else {
                            if (variable.is_multiple) {
                                row["(" + v_index + ") " + variable.var] = "0";
                            } else {
                                row["(" + v_index + ") " + variable.var] = "0";
                            }
                            row["(" + v_index + ") " + variable.var] = "";
                        }

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