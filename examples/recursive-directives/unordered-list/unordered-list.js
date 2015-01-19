angular.module('recursiveDirectives').directive('unorderedList', function(recursive) {
    return {
        scope: {
            ngModel: '='
        },
        replace: true,
        restrict: 'E',
        template: '<ul>' +
        '<li ng-repeat="(key, value) in ngModel" ng-if="isObject(value)">' +
        '{{key}}<unordered-list ng-model="value"></unordered-list>' +
        '</li>' +
        '</ul>',
        compile: function(element) {
            return recursive.compile(element);
        },
        controller: function($scope) {
            $scope.isObject = function(value) {
                return typeof value === "object";
            };
        }
    }
});