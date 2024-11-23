<?php

namespace App\Models;

use App\Database\Database;
use PDO;

/**
 * Class that works as the base for all the models
 */
abstract class BaseModel {

	/**
	 * Database table name
	 * @var string
	 */
	protected string $tableName;

	/**
	 * Instance of the PDO (for accessing database)
	 * @var PDO
	 */
	protected PDO $db;

	/**
	 * SQL WHERE statement
	 */
	protected string $whereString = "";

	/**
	 * Constructor, which initializes the PDO (database)
	 */
	public function __construct() {
		$this->db = Database::getConnection();
	}

	/**
	 * Sets the WHERE string to be used on sql
	 */
	protected function where(string $where) {
		$this->whereString .= empty($this->whereString) ? "WHERE " . $where : " AND " . $where; 
	}

	/**
	 * Get one (or none) registry by a giving id 
	 * @param string|int $id ID of the registry
	 */
	public function getOneById(string|int $id) {
		$rows = $this->db->query("SELECT * from {$this->tableName} WHERE id = '{$id}' LIMIT 1");
		return $rows->fetchAll(PDO::FETCH_NAMED)[0] ?? [];
	}

}