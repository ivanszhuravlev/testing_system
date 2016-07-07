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

            saveResult: function (result, user_id) {
                return $http.post('./php/questions/save.php', {
                    answers: result,
                    user_id: user_id
                });
            },

            find_table: function (questions) {
                var table_start = -1,
                    table_end = -1,
                    is_table = -1,
                    next_is_table = -1;

                for (var key in questions) {

                    /**
                     * Находим опцию table в вопросе.
                     * Проверка нужна, чтобы избежать ошибки.
                     *
                     */
                    if (questions[key].options !== null) {
                        is_table = questions[key].options.indexOf("table");
                    }

                    /**
                     * Находим начальную позицию таблицы.
                     *
                     */
                    if (is_table != -1 && table_start === -1) {
                        table_start = key;
                    }

                    /**
                     * Генерируем ключ следующего элемента.
                     * Функция toFixed(2) округляет ключ до 2 знака после запятой;
                     *
                     */
                    var next_key = "0" + (+key + 0.01).toFixed(2);

                    /**
                     * Находим опцию table в следующем вопросе.
                     * Проверка нужна, чтобы избежать ошибки.
                     *
                     */
                    if (questions[next_key] && questions[next_key].options !== null) {
                        next_is_table = questions[next_key].options.indexOf("table");
                    } else {
                        next_is_table = -1;
                    }

                    /**
                     * Находим конечную позицию таблицы.
                     *
                     */
                    if (is_table != -1 && (!questions[next_key] || next_is_table == -1)) {
                        console.log("Table: " + next_is_table);
                        console.log("Key is " + key);
                        table_end = key;
                        
                        is_table = -1;
                    }

                }

                if (table_start == -1 || table_end == -1) {
                    return [];
                }

                table_start = (table_start * 100) % 10;
                table_end = (table_end * 100) % 10;

                return [table_start, table_end];
            }

        };
    }]);