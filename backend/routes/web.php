<?php

/** @var Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

use Laravel\Lumen\Routing\Router;

$router->get('/version', function () use ($router){
    return response()->json(['version' => $router->app->version()]);
});
$router->get('/features', function (){
    return response()->json([
            'project' => true,
            'security' => true,
            'mqtt' => false,
            'ntp' => true,
            'ota' => false,
            'upload_firmware' => false,
        ])->header('Access-Control-Allow-Origin', '*');
});


$router->post('/signIn', 'Auth\LoginController');
$router->group(['middleware' => 'auth'], function() use ($router){
    $router->get('/verifyAuthorization','Auth\VerifyAuthorizationController' );
    $router->get('//lightState','Auth\VerifyAuthorizationController' );
});











$router->group(['prefix' =>'auth'], function () use ($router){
    $router->post('/register', 'Auth\RegisterController');
    $router->post('/login', 'Auth\LoginController');


    $router->group(['middleware' => 'auth'], function() use ($router){
        $router->get('/', 'HomeController');
        $router->get('/users', 'User\ListAllController');
        $router->get('/users/{userId}', 'User\ViewUserController');
        $router->post('/users', 'User\CreateController');
    });
});
