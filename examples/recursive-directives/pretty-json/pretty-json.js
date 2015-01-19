angular.module('recursiveDirectives').directive('prettyJson', function(recursive) {
    return {
        restrict: 'E',
        scope: {
            json: '='
        },
        template: '<div><a href="" ng-click="open = !open"><span ng-if="open">-</span><span ng-if="!open">+</a></span>{' +
        '<div ng-show="open" ng-repeat="(key, value) in json" class="node">' +
        '<span class="property">"{{key}}"</span> : ' +
        '<span class="boolean-value" ng-if="isBoolean(value)">{{value}}</span>' +
        '<span class="string-value" ng-if="isString(value)">"{{value}}"</span>' +
        '<pretty-json ng-if="isObject(value)" json="value"></span>' +
        '<span ng-if="!$last">,</span>' +
        '</div>' +
        '}</div>',
        controller: function($scope) {
            $scope.open = true;

            $scope.isBoolean = function(value) {
                return typeof value === "boolean";
            };

            $scope.isObject = function(value) {
                return typeof value === "object";
            };

            $scope.isString = function (value) {
                return typeof value === "string";
            };
        },
        compile: function(element) {
            return recursive.compile(element);
        }
    }
});