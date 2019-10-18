<?php
$app->get('/api/espacio', function ($request, $response, $args) {
    $server="localhost";
    $dbn= "AvantiParking";
    $SGBD="sqlsrv:Server=".$server.";Database=".$dbn;
    $db=new PDO($SGBD,"sa","1234");
    
    $sql = "SELECT * FROM view_espacio";
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

$app->post('/api/espacio', function($request,$response,$args){

    $server="localhost";
    $dbn= "AvantiParking";
    $SGBD="sqlsrv:Server=".$server.";Database=".$dbn;

    $usuario = $request->getParam('usuario');
    $contrasena = $request->getParam('contrasena');
    $nombre = $request->getParam('nombre');
	$parqueo = $request->getParam('parqueo');
   
    $db=new PDO($SGBD, $usuario,$contrasena);

   $sql = "exec pa_agregar_espacio :nombre,:parqueo;";
   try{
     $resultado = $db->prepare($sql);

     $resultado->bindParam(':nombre', $nombre);
     $resultado->bindParam(':parqueo', $parqueo);

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

 $app->put('/api/espacio/{id}', function($request,$response,$args){
    $server="localhost";
    $dbn= "AvantiParking";
    $SGBD="sqlsrv:Server=".$server.";Database=".$dbn;

    $usuario = $request->getParam('usuario');
    $contrasena = $request->getParam('contrasena');

    $db=new PDO($SGBD, $usuario,$contrasena);

    $id = $request->getAttribute('id');
    $nombre = $request->getParam('nombre');
	$estado = $request->getParam('estado');
	$tipo_espacio = $request->getParam('tipo_espacio');
   
   $sql = "exec pa_actualizar_espacio :id,:nombre,:estado,:tipo_espacio;";
      
   try{
     $resultado = $db->prepare($sql);
 
     $resultado->bindParam(':id', $id);
     $resultado->bindParam(':nombre', $nombre);
     $resultado->bindParam(':estado', $estado);
     $resultado->bindParam(':tipo_espacio', $tipo_espacio);
 
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

$app->delete('/api/espacio/{id}', function($request,$response,$args){
    $server="localhost";
    $dbn= "AvantiParking";
    $SGBD="sqlsrv:Server=".$server.";Database=".$dbn;

    $id = $request->getAttribute('id');
    $usuario = $request->getParam('usuario');
    $contrasena = $request->getParam('contrasena');

    $db=new PDO($SGBD, $usuario,$contrasena);

    $sql = "exec pa_eliminar_espacio :id;";
      
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