(function (angular) {
    "use strict";

    angular
        .module("todoApp")
        .directive("todoPaginatedList", [todoPaginatedList])
        .directive("pagination", [pagination]);

    /**
     * Directive definition function of 'todoPaginatedList'.
     * 
     * TODO: correctly parametrize scope (inherited? isolated? which properties?)
     * TODO: create appropriate functions (link? controller?) and scope bindings
     * TODO: make appropriate general directive configuration (support transclusion? replace content? EAC?)
     * 
     * @returns {} directive definition object
     */

    //Diretiva Principal: exibe a lista de todos com paginação
    function todoPaginatedList() {

        var directive = {
            restrict: "E", // example setup as an element only
            templateUrl: "app/templates/todo.list.paginated.html",
            scope: {}, // example empty isolate scope
            controller: ["$scope", "$http", controller],
            link: link
        };

        function controller($scope, $http) {

            //Variaveis de controle
            $scope.todos = [];
            $scope.page = 1;
            $scope.pageSize = "20";
            $scope.totalCount = 0;
            $scope.totalPages = 0;
            $scope.sortBy = "createdDate";
            $scope.descending = true;
            $scope.loading = false;
            $scope.userSorted = false;

            //Busca a lista de todo da API com paginação
            $scope.loadTodos = function () {
                $scope.loading = true;
                let url = "/api/Todo/Paginated";
                $http.get(url, {
                    params: {
                        page: $scope.page,
                        pageSize: $scope.pageSize === "all" ? $scope.totalCount || 9999 : $scope.pageSize,
                        sortBy: $scope.sortBy,
                        descending: $scope.descending
                    }
                }).then(function (response) {
                    $scope.todos = response.data.data;
                    $scope.totalCount = response.data.count;
                    $scope.totalPages = $scope.pageSize === "all" ? 1 : Math.ceil($scope.totalCount / $scope.pageSize);
                    $scope.loading = false;
                });
            };

            //Ordena pelo header da coluna da tabela
            $scope.sort = function (property) {
                if ($scope.sortBy === property) {
                    $scope.descending = !$scope.descending; //altera entre asc e desc
                } else {
                    $scope.sortBy = property;
                    $scope.descending = false;
                }
                $scope.page = 1; //volta para a primeira página ao reordenar
                $scope.userSorted = true;
                $scope.loadTodos();
            };

            //Navegação entre páginas
            $scope.changePage = function (newPage) {
                const validPage = parseInt(newPage);
                if (!isNaN(validPage) && validPage > 0 && validPage <= $scope.totalPages) {
                    $scope.page = validPage;
                    $scope.loadTodos();
                }
            };

            $scope.setPageSize = function (size) {
                $scope.pageSize = size;
                $scope.page = 1;
                $scope.loadTodos();
            };

            $scope.goToFirst = function () {
                $scope.changePage(1);
            };

            $scope.goToLast = function () {
                $scope.changePage($scope.totalPages);
            };

            $scope.goToNext = function () {
                $scope.changePage($scope.page + 1);
            };

            $scope.goToPrevious = function () {
                $scope.changePage($scope.page - 1);
            };

            //Carrega os dados iniciais
            $scope.loadTodos();
        }

        function link(scope, element, attrs) { }

        return directive;
    }

    /**
     * Directive definition function of 'pagination' directive.
     * 
     * TODO: make it a reusable component (i.e. usable by any list of objects not just the Models.Todo model)
     * TODO: correctly parametrize scope (inherited? isolated? which properties?)
     * TODO: create appropriate functions (link? controller?) and scope bindings
     * TODO: make appropriate general directive configuration (support transclusion? replace content? EAC?)
     * 
     * @returns {} directive definition object
     */

    //Diretiva de paginação
    function pagination() {

       var directive = {
            restrict: "E",
            templateUrl: "app/templates/pagination.html",
            scope: {
                page: "=",
                pageSize: "=",
                totalCount: "=",
                totalPages: "=",
                onPageChange: "&",
                onPageSizeChange: "&"
            },
            controller: ["$scope", controller],
            link: link
        };

        function controller($scope) {

            //controles da paginação
            $scope.goToFirst = function () {
                $scope.onPageChange({ newPage: 1 });
            };

            $scope.goToLast = function () {
                $scope.onPageChange({ newPage: $scope.totalPages });
            };

            $scope.goToNext = function () {
                if ($scope.page < $scope.totalPages) {
                    $scope.onPageChange({ newPage: $scope.page + 1 });
                }
            };

            $scope.goToPrevious = function () {
                if ($scope.page > 1) {
                    $scope.onPageChange({ newPage: $scope.page - 1 });
                }
            };

            //Muda a pagina via input
            $scope.changePage = function (newPage) {
                const validPage = parseInt(newPage);
                if (!isNaN(validPage) && validPage >= 1 && validPage <= $scope.totalPages) {
                    $scope.onPageChange({ newPage: validPage });
                }
            };

            //atualiza o tamanho da pagina
            $scope.setPageSize = function (size) {
                $scope.onPageSizeChange({ size: size });
            };
        }

        function link(scope, element, attrs) { }

        return directive;

    }

})(angular);

