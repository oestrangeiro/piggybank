<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');

// Rotas da api
$routes->resource('users');
$routes->resource('campanhas');
$routes->resource('entidades');

// Rotas com parametros
$routes->resource('users', [App\Controllers\Users::class, 'show']);
$routes->resource('campanhas', [App\Controllers\Campanhas::class, 'show']);
$routes->resource('entidades', [App\Controllers\Entidades::class, 'show']);
