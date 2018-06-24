angular.module('books').factory('UserService', ['$rootScope', '$location', '$cookieStore', '$http', '$q', function ($rootScope,$location,$cookieStore,$http,$q) {
	var service = {
		login: function(data){
			var deferred = $q.defer();
			data.action = 'login';
			$http({
				url: 'libs/books/controllers/default.php',
				method: 'POST',
				data: $.param(data),
				headers: {'Content-Type':'application/x-www-form-urlencoded'}
			}).then(function(data){
				deferred.resolve(data.data);
			}, function(data){
				deferred.reject(data.data);
			});
			return deferred.promise;
		},
		logout: function(data){
			var deferred = $q.defer();
			data.action = 'logout';
			$http({
				url: 'libs/books/controllers/default.php',
				method: 'POST',
				data: $.param(data),
				headers: {'Content-Type':'application/x-www-form-urlencoded'}
			}).then(function(data){
				deferred.resolve(data.data);
			}, function(data){
				deferred.reject(data.data);
			});
			return deferred.promise;
		},
		addUser: function(data){
			var deferred = $q.defer();
			data.action = 'addUser';
			$http({
				url: 'libs/books/controllers/default.php',
				method: 'POST',
				data: $.param(data),
				headers: {'Content-Type':'application/x-www-form-urlencoded'}
			}).then(function(data){
				deferred.resolve(data.data);
			}, function(data){
				deferred.reject(data.data);
			});
			return deferred.promise;
		},
		inSession: function(data){
			var deferred = $q.defer();
			data.action = 'inSession';
			$http({
				url: 'libs/books/controllers/default.php',
				method: 'POST',
				data: $.param(data),
				headers: {'Content-Type':'application/x-www-form-urlencoded'}
			}).then(function(data){
				deferred.resolve(data.data);
			}, function(data){
				deferred.reject(data.data);
			});
			return deferred.promise;
		}
	}
	return service;
}]);