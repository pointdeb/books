angular.module('books').controller('BookController', ['$scope', '$rootScope', '$location', '$cookieStore', '$http', '$q', 'BookService', 'UserService', function ($scope,$rootScope,$location,$cookieStore,$http,$q,BookService,UserService) {
	
	$scope.verifySession= function(){
		UserService.inSession({}).then(function(data){
			$rootScope.user = undefined;
			$rootScope.user = data;
			$rootScope.session = true;
			if ($location.path() === '/login' || $location.path() === '/user/add') {
				$location.path('/');
			}else{
				$location.path($location.path());
			}
		}, function(data){
			$rootScope.session = false;
			$rootScope.user = undefined;
			if ($location.path() !== '/user/add') {
				$location.path('/login');
			}
		});
	}
	$scope.verifySession();

	$scope.editBook = function(book){
		$scope.book = book;
		$scope.form_id = 'book-edit';
	}

	$scope.deleteBook = function(book){
		console.log('Removed '+ book.id);
		$scope.bookToDelete = book;
		$('#delete-modal .modal').modal('show');
	}

	$scope.deleteBookConfirm = function(book){
		console.log('Removed permanent '+ book.id);
		BookService.deleteBook({book: book.id, permanent: true}).then(function (response) {
			console.log(response);
			$scope.bookToDelete = undefined;
			$('#delete-modal .modal').modal('hide');
			$scope.findBook();
		}, function (error) {
			console.error(error);
			$rootScope.error = data;
			$('#error-modal .modal').modal('show');
		})
	}

	$scope.borrowBook = function(book){
		$scope.book = undefined;
		$scope.book = book;
		if (!$rootScope.user.admin) {
			$('#borrow-modal .modal').modal('show');
		}else{
			$scope.form_id = 'book-edit';
		}
	}

	$scope.borrowBookConfirm = function(book){
		book.book = book.id;
		book.start_date = BookService.formatDate(book.start_date);
		book.end_date = BookService.formatDate(book.end_date);
		BookService.emprunt(book).then(function(data){
			$('#borrow-modal .modal').modal('hide');	
		}, function(data){
			console.log(data);
			$rootScope.error = data;
			$('#borrow-modal .modal').modal('hide');
			$('#error-modal .modal').modal('show');
		});
	}

	$scope.clearForm = function(){
		$scope.form_id = 'book-add';
		$scope.book = undefined;
	}

	$scope.findBook = function(){
		BookService.findBook({}).then(function(data){
			$scope.books = data;
		}, function(data){
			console.log(data);
		});
	}
	$scope.findBook();
	$scope.findUserEmprunt = function(){
		BookService.findUserEmprunt({}).then(function(data){
			$scope.myBooks = data;
			console.log($scope.myBooks);
		}, function(data){
			console.log(data);
		});
	}
	$scope.addBook = function(book){
		BookService.addBook(book).then(function(data){
			$scope.findBook();
		}, function(data){
			console.log(data);
			$rootScope.error = data;
			$('#error-modal .modal').modal('show');
		});
	}
	$scope.updateBook = function(book){
		BookService.updateBook(book).then(function(data){
			$scope.findBook();
		}, function(data){
			console.log(data);
			$rootScope.error = data;
			$('#error-modal .modal').modal('show');
		});
	}
	$scope.bookDetail = function(book){
		$scope.book = undefined;
		$scope.book = book;
		if (!$rootScope.user.admin) {
			$('#detail-modal .modal').modal('show');
		}else{
			$scope.form_id = 'book-edit';
		}
	}
	$scope.getBook = function(){
		BookService.findBook({id: $routeParams.id}).then(function(data){
			$scope.book = {
				id: data.id,
				name: data.name
			}
		}, function(data){
			console.log(data);
			$location.path('/');
		});
	}

}]);