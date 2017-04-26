angular.module('filterApp', [])
    .controller('filterAppController', ['$http', '$scope', '$filter', ($http, $scope, $filter) => {
        $scope.documents = [];
        $scope.tags = [];
        $scope.filterExpression = (doc) => {
            if (doc) {
                let flag = true;
                $scope.tags.forEach((tag) => {
                    if (!tag.isActive) {
                        return;
                    }
                    if (!doc.tags.find(docTag => tag.tag === docTag)) {
                        flag = false;
                    }
                });
                return flag;
            }

        };
        $http.get('./data.json').then((response) => {
            $scope.documents = response.data.documents.map((document) => {
                document.created = $filter('date')(document.created, 'dd.MM.yyyy');
                return document;
            });
            $scope.columnHeaders = [];
            $scope.documents.forEach(document => {
                document.tags.forEach(tag => {
                    if (!$scope.tags.find(scopeTag => scopeTag.tag === tag)) {
                        $scope.tags.push({tag: tag, isActive: false});
                    }
                });
                for (let property in document) {
                    if (!$scope.columnHeaders.find(tx => tx === property)) {
                        $scope.columnHeaders.push(property);
                    }
                }
            });
        })
    }])
