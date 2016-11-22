angular.module('testApp').directive('isless', function () {
    return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
        ctrl.$validators.isless = function(modelValue, viewValue) {
            var q_index = attrs.isless;
            if (scope.questions[q_index].name == "sexvagsafe" || scope.questions[q_index].name == "sexanalsafe") {
                var prev_question = scope.questions[q_index - 1];

                if (ctrl.$isEmpty(modelValue)) {
                  // consider empty models to be valid
                  return true;
                }

                if (Number(viewValue) <= prev_question.user_answers[prev_question.id]) {
                  return true;
                }

                return false;
            } else {
                return true;
            }
        };
    }
    };
});