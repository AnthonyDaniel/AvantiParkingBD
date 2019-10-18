<?php
$app->get('/api/vehiculo', function ($request, $response, $args) {
    $server="localhost";
    $dbn= "AvantiParking";
    $SGBD="sqlsrv:Server=".$server.";Database=".$dbn;
    $db=new PDO($SGBD,"sa","1234");
    
    $sql = "SELECT * FROM view_vehiculo";
    try{
      $resultado = $db->query($sql);
  
      $sedes = $resultado->fetchAll(PDO::FETCH_OBJ);
      echo json_encode($sedes);
      
      $resultado = null;
      $db = null;
    }catch(PDOException $e){
      echo '{"error" : {"text":'.$e->getMessage().'}';
    }
});

$app->post('/api/vehiculo', function($request,$response,$args){

    $server="localhost";
    $dbn= "AvantiParking";
    $SGBD="sqlsrv:Server=".$server.";Database=".$dbn;

    $usuario = $request->getParam('usuario');
    $contrasena = $request->getParam('contrasena');
  
    $placa = $request->getParam('placa');
	$marca = $request->getParam('marca');
	$modelo = $request->getParam('modelo');
	$username = $request->getParam('username');

    $db=new PDO($SGBD, $usuario,$contrasena);

   $sql = "exec pa_agregar_vehiculo :placa,:marca,:modelo,:username;";
   try{
     $resultado = $db->prepare($sql);

     $resultado->bindParam(':placa', $placa);
     $resultado->bindParam(':marca', $marca);
     $resultado->bindParam(':modelo', $modelo);
     $resultado->bindParam(':username', $username);

     if($resultado->execute()){
        echo json_encode("Se guardo correctamente.");  
     }else{
        echo json_encode("No guardo correctamente");  
     }
     $resultado = null;
     $db = null;
   }catch(PDOException $e){
     echo '{"error" : {"text":'.$e->getMessage().'}';
   }
 }); 

 $app->put('/api/vehiculo/{id}', function($request,$response,$args){
    $server="localhost";
    $dbn= "AvantiParking";
    $SGBD="sqlsrv:Server=".$server.";Database=".$dbn;

    $usuario = $request->getParam('usuario');
    $contrasena = $request->getParam('contrasena');

    $db=new PDO($SGBD, $usuario,$contrasena);

    $placa = $request->getAttribute('id');
	$marca = $request->getParam('marca');
	$modelo = $request->getParam('modelo');
	$username = $request->getParam('username');
   
   $sql = "exec pa_actualizar_vehiculo :placa,:marca,:modelo,:username;";
   try{
     $resultado = $db->prepare($sql);

     $resultado->bindParam(':placa', $placa);
     $resultado->bindParam(':marca', $marca);
     $resultado->bindParam(':modelo', $modelo);
     $resultado->bindParam(':username', $username);
 
     if($resultado->execute()){
        echo json_encode("Se actualiizo correctamente");  
     }else{
        echo json_encode("No actualiizo");  
     }
     $resultado = null;
     $db = null;
   }catch(PDOException $e){
     echo '{"error" : {"text":'.$e->getMessage().'}';
   }
 }); 

$app->delete('/api/vehiculo/{id}', function($request,$response,$args){
    $server="localhost";
    $dbn= "AvantiParking";
    $SGBD="sqlsrv:Server=".$server.";Database=".$dbn;

    $id = $request->getAttribute('id');
    $usuario = $request->getParam('usuario');
    $contrasena = $request->getParam('contrasena');
    $db=new PDO($SGBD, $usuario,$contrasena);

    $sql = "exec pa_eliminar_vehiculo :id";
      
   try{
     $resultado = $db->prepare($sql);
 
     $resultado->bindParam(':id', $id);
 
     if($resultado->execute()){
        echo json_encode("Se Elimino correctamente");  
     }else{
        echo json_encode("No Elimino");  
     }
     $resultado = null;
     $db = null;
   }catch(PDOException $e){
     echo '{"error" : {"text":'.$e->getMessage().'}';
   }
 }); 