<?php
$app->get('/api/sede', function ($request, $response, $args) {
    $server="localhost";
    $dbn= "AvantiParking";
    $SGBD="sqlsrv:Server=".$server.";Database=".$dbn;
    $db=new PDO($SGBD,"sa","1234");
    
    $sql = "SELECT * FROM view_sede";
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
$app->post('/api/sede', function($request,$response,$args){

    $server="localhost";
    $dbn= "AvantiParking";
    $SGBD="sqlsrv:Server=".$server.";Database=".$dbn;

    $usuario = $request->getParam('usuario');
    $contrasena = $request->getParam('contrasena');
    $nombre = $request->getParam('nombre');
    $direccion = $request->getParam('direccion');
   
    $db=new PDO($SGBD, $usuario,$contrasena);

   $sql = "exec pa_agregar_sede :nombre,:direccion;";
   try{
     $resultado = $db->prepare($sql);
 
     $resultado->bindParam(':nombre', $nombre);
     $resultado->bindParam(':direccion', $direccion);
 
     $resultado->execute();
     echo json_encode("Se guardo correctamente.");  
 
     $resultado = null;
     $db = null;
   }catch(PDOException $e){
     echo '{"error" : {"text":'.$e->getMessage().'}';
   }
 }); 
 
$app->put('/api/sede/{id}', function($request,$response,$args){
    $server="localhost";
    $dbn= "AvantiParking";
    $SGBD="sqlsrv:Server=".$server.";Database=".$dbn;

    $usuario = $request->getParam('usuario');
    $contrasena = $request->getParam('contrasena');

    $db=new PDO($SGBD, $usuario,$contrasena);

    $id = $request->getAttribute('id');
    $nombre = $request->getParam('nombre');
    $direccion = $request->getParam('direccion');
   
   $sql = "exec pa_actualizar_sede :id,:nombre,:direccion;";
      
   try{
     $resultado = $db->prepare($sql);
 
     $resultado->bindParam(':id', $id);
     $resultado->bindParam(':nombre', $nombre);
     $resultado->bindParam(':direccion', $direccion);
 
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

 $app->delete('/api/sede/{id}', function($request,$response,$args){
    $server="localhost";
    $dbn= "AvantiParking";
    $SGBD="sqlsrv:Server=".$server.";Database=".$dbn;

    $id = $request->getAttribute('id');
    $usuario = $request->getParam('usuario');
    $contrasena = $request->getParam('contrasena');

    $db=new PDO($SGBD, $usuario,$contrasena);

    $sql = "exec pa_eliminar_sede :id;";
      
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