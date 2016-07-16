"use strict";

angular.module('testApp')
    .factory('BlocksService', ['$http', function ($http) {
        return {
            getBlocks: function () {
                return $http.get('./php/blocks/get_blocks.php');
            },

            getQuestions: function (content_id, block_id, page_id) {
                return $http.post('./php/blocks/get_questions.php', {
                    content_id: content_id,
                    block_id: block_id,
                    page_id: page_id,
                });
            },

            getBlock: function (id) {
                return $http.post('./php/blocks/get_block.php', {
                    id: id
                });
            },

            saveResult: function (result, result_multiple, user_id) {
                return $http.post('./php/questions/save.php', {
                    answers: result,
                    mult_answers: result_multiple,
                    user_id: user_id
                });
            },

            find_table: function (questions) {
                var table_start = -1,
                    table_end = -1,
                    is_table = -1,
                    next_is_table = -1;

                questions.forEach(function(question, index) {
                    /**
                     * Находим опцию table в вопросе.
                     * Проверка нужна, чтобы избежать ошибки.
                     *
                     */
                    if (question.options !== null) {
                        is_table = question.options.indexOf("table");
                    }

                    /**
                     * Находим начальную позицию таблицы.
                     *
                     */
                    if (is_table != -1 && table_start === -1) {
                        table_start = index;
                    }

                    /**
                     * Находим опцию table в следующем вопросе.
                     * Проверка нужна, чтобы избежать ошибки.
                     *
                     */
                    if (questions[index + 1] && questions[index + 1].options !== null) {
                        next_is_table = questions[index + 1].options.indexOf("table");
                    } else {
                        next_is_table = -1;
                    }

                    /**
                     * Находим конечную позицию таблицы.
                     *
                     */
                    if (is_table != -1 && (!questions[index + 1] || next_is_table == -1)) {
                        table_end = index;

                        is_table = -1;
                    }

                });

                if (table_start == -1 || table_end == -1) {
                    return [];
                }

                return [table_start, table_end];
            }

        };
    }]);