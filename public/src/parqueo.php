<?php
$app->get('/api/parqueo', function ($request, $response, $args) {
    $server="localhost";
    $dbn= "AvantiParking";
    $SGBD="sqlsrv:Server=".$server.";Database=".$dbn;
    $db=new PDO($SGBD,"sa","1234");
    
    $sql = "SELECT * FROM view_parqueo";
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
$app->post('/api/parqueo', function($request,$response,$args){

    $server="localhost";
    $dbn= "AvantiParking";
    $SGBD="sqlsrv:Server=".$server.";Database=".$dbn;

    $usuario = $request->getParam('usuario');
    $contrasena = $request->getParam('contrasena');
    $id = $request->getParam('id_parqueo');
    $nombre = $request->getParam('nombre');
	$zona = $request->getParam('zona');
	$cantidad = $request->getParam('cantidad');
	$comienzo = $request->getParam('comienzo');
	$sede = $request->getParam('sede');
   
    $db=new PDO($SGBD, $usuario,$contrasena);

   $sql = "exec pa_agregar_parqueo :id,:nombre,:zona,:cantidad,:comienzo,:sede;";
   try{
     $resultado = $db->prepare($sql);
 
     $resultado->bindParam(':id', $id);
     $resultado->bindParam(':nombre', $nombre);
     $resultado->bindParam(':zona', $zona);
     $resultado->bindParam(':cantidad', $cantidad);
     $resultado->bindParam(':comienzo', $comienzo);
     $resultado->bindParam(':sede', $sede);

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
 
$app->put('/api/parqueo/{id}', function($request,$response,$args){
    $server="localhost";
    $dbn= "AvantiParking";
    $SGBD="sqlsrv:Server=".$server.";Database=".$dbn;

    $usuario = $request->getParam('usuario');
    $contrasena = $request->getParam('contrasena');

    $db=new PDO($SGBD, $usuario,$contrasena);

    $id = $request->getAttribute('id');
    $nombre = $request->getParam('nombre');
	$zona = $request->getParam('zona');
	$sede = $request->getParam('sede');
   
   $sql = "exec pa_actualizar_parqueo :id,:nombre,:zona,:sede;";
      
   try{
     $resultado = $db->prepare($sql);
 
     $resultado->bindParam(':id', $id);
     $resultado->bindParam(':nombre', $nombre);
     $resultado->bindParam(':zona', $zona);
     $resultado->bindParam(':sede', $sede);
 
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

 $app->delete('/api/parqueo/{id}', function($request,$response,$args){
    $server="localhost";
    $dbn= "AvantiParking";
    $SGBD="sqlsrv:Server=".$server.";Database=".$dbn;

    $id = $request->getAttribute('id');
    $usuario = $request->getParam('usuario');
    $contrasena = $request->getParam('contrasena');

    $db=new PDO($SGBD, $usuario,$contrasena);

    $sql = "exec pa_eliminar_parqueo :id;";
      
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