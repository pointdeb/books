<?php 
	/**
	* Db
	*/
	abstract class Db extends PDO
	{
		
		function __construct()
		{
				
			try {
				parent::__construct('mysql:host=localhost;dbname=book','root','', [PDO::ATTR_CASE=> PDO::CASE_NATURAL,PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,PDO::ATTR_EMULATE_PREPARES   => true,					PDO::ATTR_ERRMODE=> PDO::ERRMODE_EXCEPTION,	PDO::ATTR_ORACLE_NULLS=> PDO::NULL_NATURAL,	PDO::ATTR_STRINGIFY_FETCHES  => false]);
				
			} catch (Exception $e) {
				http_response_code(400);
				print_r($e->getMessage());
				die;
			}
		}
	}

?>