<?php 
	/**
	* Books
	*/
	require_once 'Db.php';
	class Book extends Db
	{
		
		function __construct()
		{
			parent::__construct();
		}
		public function find(){
			return $this->query("SELECT * FROM book WHERE active = true ORDER BY id DESC")->fetchAll(PDO::FETCH_OBJ);
		}
		public function findById($id){
			return $this->query("SELECT * FROM book WHERE id = ".$id." AND active = true ORDER BY id DESC")->fetch(PDO::FETCH_OBJ);
		}
		public function findEmprunt(){
			return $this->query("SELECT u.first_name, b.name, b.edition, b.author, e.* FROM emprunt AS e INNER JOIN user AS u ON e.user = u.id INNER JOIN book as b ON e.book = b.id ORDER BY e.id DESC")->fetchAll(PDO::FETCH_OBJ);
		}

		public function findUserEmprunt($user){
			return $this->query("SELECT u.first_name, b.name, b.edition, b.author, e.* FROM emprunt AS e INNER JOIN user AS u ON e.user = u.id INNER JOIN book as b ON e.book = b.id WHERE e.user = ".$user ." ORDER BY e.id DESC" )->fetchAll(PDO::FETCH_OBJ);
		}

		public function add($data){
			$exist = $this->prepare('SELECT DISTINCT * FROM book WHERE name=:name');
			$exist->execute(array('name' => $data['name']));

			if ($exist->rowCount() > 0) {
				return array('error'=>true, 'detail'=> 'Book already exist');
			}
			$insert = $this->prepare("INSERT INTO book (name, edition, author, nbr, user) VALUES(:name, :edition, :author, :nbr, :user)");

			$insert->execute($data);
			return array('error'=>false, 'detail'=> 'Add successfully');
		}
		public function update($data){
			$update = $this->prepare("UPDATE book SET name=:name, edition=:edition, author=:author , nbr=:nbr, user=:user WHERE id =:id");

			$update->execute($data);
			return array('error'=>false, 'detail'=> 'Update successfully');
		}
		public function delete($data){
			$exist = $this->prepare('SELECT DISTINCT * FROM emprunt WHERE book=:id');
			$exist->execute(array('id' => $data['book']));

			if ($exist->rowCount() > 0) {
				return array('error'=>true, 'detail'=> 'Book is still in emprunt.');
			}
			if ($data['permanent']) {
				$sql = "DELETE FROM book WHERE id=:id";
			} else {
				$sql = "UPDATE book SET active = false WHERE id=:id";
			}
			
			$delete = $this->prepare($sql);

			$delete->execute(array('id' => $data['book']));
			return array('error'=>false, 'detail'=> 'Suppression successfully');
		}
		public function emprunt($data){
			$bookNbr = $this->prepare("SELECT * FROM book WHERE id =:id");
			$bookNbr->execute(array('id'=>$data['book']));
			$bookNbr = $bookNbr->fetch(PDO::FETCH_OBJ)->nbr;

			$bookDisponibility = $this->prepare("SELECT DISTINCT * FROM emprunt WHERE book=:book AND active = true ");
			$bookDisponibility->execute(array('book'=>$data['book']));

			if ($bookDisponibility->rowCount() >= $bookNbr) {
				return array('error'=>true, 'detail'=> 'This book is not disponible');
			}
			$userEmprunt = $this->prepare("SELECT DISTINCT * FROM emprunt WHERE user=:user AND active = true ");
			$userEmprunt->execute(array('user'=>$data['user']));

			if ($userEmprunt->rowCount() > 0) {
				return array('error'=>true, 'detail'=> "Please return " . $userEmprunt->rowCount() . " book(s) before.");
			}

			$emprunt = $this->prepare("INSERT INTO emprunt (start_date, end_date, book, user) VALUES(:start_date, :end_date, :book, :user)");
			$emprunt->execute($data);

			return array('error'=>false, 'detail'=> 'Emprunt successfully');
		}
		public function returnEmprunt($data){
			$userEmprunt = $this->prepare("SELECT DISTINCT * FROM emprunt WHERE user=:user AND active = true");
			$userEmprunt->execute(array('user'=>$data['user']));

			if ($userEmprunt->rowCount() == 0) {
				return array('error'=>true, 'detail'=> "You haven't any book to return");
			}
			foreach ($userEmprunt->fetchAll(PDO::FETCH_OBJ) as $emprunt) {
				$returnEmprunt = $this->prepare("UPDATE emprunt SET active=false WHERE id =:id ");
				$returnEmprunt->execute(array('id'=> $emprunt->id));
			}
			return array('error'=>false, 'detail'=> "Emprunt returned successfully");
		}
	}
 ?>