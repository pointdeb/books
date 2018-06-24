angular.module('books').factory('BookService', ['$rootScope', '$location', '$cookieStore', '$http', '$q', function ($rootScope,$location,$cookieStore,$http,$q) {
	var service = {
		addBook: function(data){
			var deferred = $q.defer();
			data.action = 'addBook';
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
		updateBook: function(data){
			var deferred = $q.defer();
			data.action = 'updateBook';
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
		deleteBook: function(data){
			var deferred = $q.defer();
			data.action = 'deleteBook';
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
		findBook: function(data){
			var deferred = $q.defer();
			data.action = 'findBook';
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
		findEmprunt: function(data){
			var deferred = $q.defer();
			data.action = 'findEmprunt';
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
		findUserEmprunt: function(data){
			var deferred = $q.defer();
			data.action = 'findUserEmprunt';
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
		emprunt: function(data){
			var deferred = $q.defer();
			data.action = 'emprunt';
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
		returnEmprunt: function(data){
			var deferred = $q.defer();
			data.action = 'returnEmprunt';
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
		formatDate: function (date) {
			var day = date.getDate();
			var month = date.getMonth() + 1;
			var year = date.getFullYear();

			day = day < 10 ? '0' + day: day;
			month = month < 10 ? '0' + month: month;

			return `${year}/${month}/${day}`;
		}

	};
	return service;
}]);