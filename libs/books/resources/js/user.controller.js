angular.module('books').controller('UserController', ['$scope', '$rootScope', '$location', '$cookieStore', '$http', '$q', 'BookService', 'UserService', function ($scope, $rootScope, $location, $cookieStore, $http, $q, BookService, UserService) {
    $scope.verifySession = function () {
        UserService.inSession({}).then(function (data) {
            $rootScope.user = undefined;
            $rootScope.user = data;
            $rootScope.session = true;
            if ($location.path() === '/login' || $location.path() === '/user/add') {
                $location.path('/');
            } else {
                $location.path($location.path());
            }
        }, function (data) {
            $rootScope.session = false;
            $rootScope.user = undefined;
            if ($location.path() !== '/user/add') {
                $location.path('/login');
            }
        });
    }
    $scope.verifySession();
    $scope.clearEditForm = function () {
        $scope.userEdit = false;
    }

    $scope.unBorowBook = function (book) {
        $scope.bookToRender = book;
        $('#delete-modal .modal').modal('show');
    }

    $scope.findUserEmprunt = function () {
        BookService.findUserEmprunt({}).then(function (data) {
            $scope.myBooks = data;
        }, function (data) {
            // console.log(data);
        });
    }

    $scope.findEmprunt = function () {
        BookService.findEmprunt({}).then(function (data) {
            $scope.myBooks = data;
            // console.log($scope.myBooks);
        }, function (data) {
            console.log(data);
        });
    }

    $scope.unBorowBookConfirm = function (book) {
        BookService.returnEmprunt(book).then(function (data) {
            $scope.findUserEmprunt();
            $scope.bookToRender = undefined;
            $('#delete-modal .modal').modal('hide');
        }, function (data) {
            // console.log(data);
            $rootScope.error = data;
            $('#delete-modal .modal').modal('hide');
            $('#error-modal .modal').modal('show');
        });
    }

    $scope.login = function (user) {
        UserService.login(user).then(function (data) {
            $location.path('/');
        }, function (data) {
            // console.log(data);
        });
    }
    $scope.addUser = function (user) {
        UserService.addUser(user).then(function (data) {
            $location.path('/login');
        }, function (data) {
            // console.log(data);
        });
    }
    $scope.logout = function () {
        UserService.logout({}).then(function (data) {
            $location.path('/login');
        }, function (data) {
            // console.log(data);
        });
    }

}]);