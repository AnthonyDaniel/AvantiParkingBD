<?php
require 'C:\xampp\htdocs\AvantiParkingBD\vendor\autoload.php';
$app = new Slim\App();
$app->options('/{routes:.+}', function ($request, $response, $args) {
    return $response;
});

$app->add(function ($req, $res, $next) {
    $response = $next($req, $res);
    return $response
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
});
require 'src/sede.php';
require 'src/parqueo.php';
require 'src/espacio.php';
require 'src/reserva.php';
require 'src/vehiculo.php';
require 'src/usuario.php';
$app->run();
