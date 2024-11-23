<?php

namespace App\Database;

use PDO;

/**
 * The database object. Basically just provides a shared instance of the PDO object
 */
abstract class Database {

	private static $_pdo;

	/**
	 * Provides the database object (PDO)
	 */
	public static function getConnection() : PDO {
		if(!isset(self::$_pdo)) {
			// consctructs the PDO
			$databaseName = $_ENV['DATABASE_NAME'] ?? "";
			$databaseHost = $_ENV['DATABASE_HOST'] ?? "";
			$databaseUser = $_ENV['DATABASE_USER'] ?? "";
			$databasePassword = $_ENV['DATABASE_PASSWORD'] ?? "";
			$databasePort = $_ENV['DATABASE_PORT'] ?? 3306;

			self::$_pdo = new PDO("mysql:host={$databaseHost};dbname={$databaseName};port={$databasePort}", $databaseUser, $databasePassword);
		}

		return self::$_pdo;
	}
}