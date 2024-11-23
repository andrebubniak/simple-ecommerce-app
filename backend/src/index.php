<?php

/**
 * Entry point of the application 
 */
require_once "./vendor/autoload.php";
require_once "app/Database/Database.php";

// Loads the .env file
Dotenv\Dotenv::createImmutable(dirname(__DIR__, 1))->load();

// CORS
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Origin: {$_ENV['CLIENT_URL']}");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

// Config routes
$dispatcher = FastRoute\simpleDispatcher(function(FastRoute\RouteCollector $r) {
    $r->post('/graphql', [App\Controllers\GraphqlController::class, 'handle']);
});

$routeInfo = $dispatcher->dispatch(
    $_SERVER['REQUEST_METHOD'],
    $_SERVER['REQUEST_URI']
);

switch ($routeInfo[0]) {
    case FastRoute\Dispatcher::NOT_FOUND:
        // ... 404 Not Found
        break;
    case FastRoute\Dispatcher::METHOD_NOT_ALLOWED:
        $allowedMethods = $routeInfo[1];
        // ... 405 Method Not Allowed
        break;
    case FastRoute\Dispatcher::FOUND:
        $handler = $routeInfo[1];
        $vars = $routeInfo[2];
        echo $handler($vars);
        break;
}