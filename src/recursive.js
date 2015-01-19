angular.module('recursive', []);

angular.module('recursive').factory('recursive', ['$compile', function($compile) {
    return {
        compile: function(element, link) {
            if(angular.isFunction(link)) {
                link = { post: link };
            }

            var contents = element.contents().remove();
            var compiledContents;
            return {
                pre: link && link.pre ? link.pre : null,
                post: function(scope, element) {
                    if(!compiledContents) {
                        compiledContents = $compile(contents);
                    }

                    compiledContents(scope, function(clone) {
                        element.append(clone);
                    });

                    if(link && link.post) {
                        link.post.apply(null, arguments);
                    }
                }
            }
        }
    }
}]);