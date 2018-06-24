<?php 
	/**
	* User
	*/
	session_start();
	require_once 'Db.php';
	class User extends Db
	{
		
		function __construct()
		{
			parent::__construct();
		}
		public function find(){
			return $this->query("SELECT * FROM user WHERE active = true");
		}
		public function add($data)
		{
			$exist = $this->prepare("SELECT * FROM user WHERE (first_name=:first_name AND last_name=:last_name) OR email=:email ");
			$exist->execute(array('first_name'=> $data['first_name'], 'last_name'=> $data['last_name'], 'email'=> $data['email']));

			if ($exist->rowCount() > 0) {
                return array('error'=> true, 'detail'=> "User already exist");
			}
			$insert = $this->prepare("INSERT INTO user (first_name, last_name, email, password) VALUES (:first_name, :last_name, :email, :password) ");

			$insert->execute($data);

            return array('error'=> false, 'detail'=> "User add successfully");
		}
		public function update($data)
		{
			$exist = $this->prepare("SELECT * FROM user WHERE (first_name=:first_name AND last_name=:last_name) AND id=:id ");
			$exist->execute(array('first_name'=> $data['first_name'], 'last_name'=> $data['last_name'], 'id'=> $data['id']));

			if ($exist->rowCount() > 0) {
                return array('error'=> false, 'detail'=> "User already exist");

			}
			$insert = $this->prepare("UPDATE user SET first_name=:first_name, last_name=:last_name, password=:password WHERE id=:id");

			$insert->execute($data);

            return array('error'=> false, 'detail'=> "User add successfully");
		}
		public function delete($data)
		{
			$delete = $this->prepare("UPDATE user SET active = false WHERE id=:id");
			$delete->execute(array('id'=> $data['id']));
			return "Delete successfully";
		}

		public function login($data)
		{
			$exist = $this->prepare("SELECT * FROM user WHERE email=:email AND password=:password");
			$exist->execute(array('email'=> $data['email'], 'password'=> $data['password']));

			if ($exist->rowCount() == 0) {
				return array('error'=>true, 'detail'=> 'Name or password not correct');
			}

			$_SESSION['user'] = $exist->fetch(PDO::FETCH_OBJ);
			if (!$_SESSION['user']->admin) {
				unset($_SESSION['user']->admin);
			}
			unset($_SESSION['user']->password);
			return array('error'=> false);
		}
		public function logout(){
			session_destroy();
		}

	}

?>
