<?php
$app->get('/api/usuario', function ($request, $response, $args) {
    $server="localhost";
    $dbn= "AvantiParking";
    $SGBD="sqlsrv:Server=".$server.";Database=".$dbn;
    $db=new PDO($SGBD,"sa","1234");
    
    $sql = "SELECT * FROM view_usuario";
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

$app->post('/api/usuario', function($request,$response,$args){

    $server="localhost";
    $dbn= "AvantiParking";
    $SGBD="sqlsrv:Server=".$server.";Database=".$dbn;

    $usuario = $request->getParam('usuario');
    $contrasena = $request->getParam('contrasena');
  
    $username = $request->getParam('username');
	$id = $request->getParam('id');
	$nombre = $request->getParam('nombre');
	$direccion = $request->getParam('direccion');
	$telefono = $request->getParam('telefono');
	$contra = $request->getParam('contra');

    $db=new PDO($SGBD, $usuario,$contrasena);

   $sql = "exec pa_agregar_usuario :username,:id,:nombre,:direccion,:telefono,:contra;";
   try{
     $resultado = $db->prepare($sql);

     $resultado->bindParam(':username', $username);
     $resultado->bindParam(':id', $id);
     $resultado->bindParam(':nombre', $nombre);
     $resultado->bindParam(':direccion', $direccin);
     $resultado->bindParam(':telefono', $telefono);
     $resultado->bindParam(':contra', $contra);

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

 $app->put('/api/usuario/{id}', function($request,$response,$args){
    $server="localhost";
    $dbn= "AvantiParking";
    $SGBD="sqlsrv:Server=".$server.";Database=".$dbn;

    $usuario = $request->getParam('usuario');
    $contrasena = $request->getParam('contrasena');

    $db=new PDO($SGBD, $usuario,$contrasena);

    $id = $request->getAttribute('id');
	$nombre = $request->getParam('nombre');
	$direccion = $request->getParam('direccion');
    $telefono = $request->getParam('telefono');
    $tipo = $request->getParam('tipo');
	$contra = $request->getParam('contra');
   
   $sql = "exec pa_actualizar_usuario :id,:nombre,:direccion,:telefono,:tipo,:contra;";
   try{
     $resultado = $db->prepare($sql);
 
     $resultado->bindParam(':id', $id);
     $resultado->bindParam(':nombre', $nombre);
     $resultado->bindParam(':direccion', $direccion);
     $resultado->bindParam(':telefono', $telefono);
     $resultado->bindParam(':tipo', $tipo);
     $resultado->bindParam(':contra', $contra);
 
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

$app->delete('/api/usuario/{id}', function($request,$response,$args){
    $server="localhost";
    $dbn= "AvantiParking";
    $SGBD="sqlsrv:Server=".$server.";Database=".$dbn;

    $id = $request->getAttribute('id');
    $usuario = $request->getParam('usuario');
    $contrasena = $request->getParam('contrasena');

    $db=new PDO($SGBD, $usuario,$contrasena);

    $sql = "exec pa_eliminar_usuario :id;";
      
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