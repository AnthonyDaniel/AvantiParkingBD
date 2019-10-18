<?php
require 'C:\xampp\htdocs\AvantiParking\vendor\autoload.php';
$app = new Slim\App();
require 'src/sede.php';
require 'src/parqueo.php';
require 'src/espacio.php';
require 'src/reserva.php';
require 'src/vehiculo.php';
require 'src/usuario.php';
$app->run();
