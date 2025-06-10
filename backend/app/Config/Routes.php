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

// debug
//$routes->get('campanhas', 'Campanhas::index');