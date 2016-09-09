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

            getAnswerPage: function (page) {
                return $http.post('./php/blocks/get_answers_page.php', { page_id: page });
            },

            getBlock: function (id) {
                return $http.post('./php/blocks/get_block.php', {
                    id: id
                });
            },

            getPagesNum: function (blocks) {
                var pages = 0;
                blocks.forEach(function(block) {
                    pages += Number(block.pages_num);
                });

                return pages;
            },

            getCurrentPage: function (blocks, block, page) {
                var current_page = 0,
                    b_index = 1;

                while (b_index <= block) {
                    if (b_index == block) {
                        current_page += Number(page);
                    }
                    else {
                        current_page += Number(blocks[b_index - 1].pages_num);
                    }
                    b_index++;
                }

                return current_page;
            },

            countProgress: function (pages, current_page) {
                return current_page * 100 / pages;
            },

            saveResult: function (result, result_multiple, user_id, block_id) {
                return $http.post('./php/questions/save.php', {
                    answers: result,
                    mult_answers: result_multiple,
                    user_id: user_id,
                    block_id: block_id
                });
            },

            calculate: function (block_id, page_id, questions, user) {

                if (block_id == 8 && (page_id == 23 || page_id == 31 || page_id == 33)) {
                    return $http.post('./php/questions/calc_mult_interv.php', {
                        block_id: block_id,
                        page_id: page_id,
                        answers: questions[0].user_answers.multiple,
                        user: user
                    });
                } else {
                    var ids = {};

                    questions.forEach(function(question) {
                        ids[question.id] = question.id;
                    });

                    return $http.post('./php/questions/calc.php', {
                        block_id: block_id,
                        page_id: page_id,
                        ids: ids,
                        user: user
                    });
                }
            },

            goBack: function (user) {
                return $http.post('./php/user/go_back.php', { user: user });
            },

            getResults: function (user) {
                return $http.post('./php/blocks/get_results.php', { user: user });
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