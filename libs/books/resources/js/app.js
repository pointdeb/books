angular.module('books', ['ngRoute', 'ngCookies']).config(['$routeProvider', function ($routeProvider) {
	$routeProvider.when('/', {
		templateUrl: 'libs/books/views/book/books.html',
		controller: 'BookController'
	}).when('/user/', {
		templateUrl: 'libs/books/views/user/profile.html',
		controller: 'UserController'
	}).when('/login', {
		templateUrl: 'libs/books/views/user/login.html',
		controller: 'UserController'
	}).when('/user/add', {
		templateUrl: 'libs/books/views/user/add.html',
		controller: 'UserController'
	}).otherwise({ redirectTo: '/' });
}]);


$('.navbar-left.navbar-nav li').on('click', function(){
	$('.navbar-nav li').removeClass('active');
	$(this).addClass('active');
});