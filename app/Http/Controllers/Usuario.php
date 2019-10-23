<?php

namespace App\Http\Controllers;
use App\Usuario as u;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class Usuario extends Controller
{
    public function __construct()
    { }

    public function obtenerUsuarios()
    {
        return DB::select('SELECT * FROM view_usuario');
    }

    public function guardarUsuarios(Request $request){
        $username = $request->username;
        $id = $request->id;
        $nombre = $request->nombre;
        $direccion = $request->direccion;
        $telefono = $request->telefono;
        $contrasena = $request->contrasena;

        if($username==null || $id==null || $nombre==null || $direccion==null || $telefono==null || $contrasena==null){
            return  response()->json(['error' => 'Faltan datos'], 406);
        }else{
            try{
                DB::insert("exec pa_agregar_usuario '". $username ."',".$id.",'".$nombre."','".$direccion."',".$telefono.",'".$contrasena."'" );
            }catch(\Illuminate\Database\QueryException $e){
                return  response()->json(['error' => $e], 406);
            }
        }
        return  response()->json(['data' => 'Usuario agregado correctamente'], 200);
    }
    
    public function editarUsuario($id, Request $request){

        $nombre = $request->nombre;
        $direccion = $request->direccion;
        $telefono = $request->telefono;
        $contrasena = $request->contrasena;

            try{
                $data = DB::table('usuario')->select('id')->where('id', '=', $id)->first();
      
                if($id!=null && $nombre!=null && $direccion!=null && $telefono!=null && $contrasena!=null){
                    if($data!=null){
                        DB::insert("exec pa_actualizar_usuario ".$id.",'".$nombre."','".$direccion."',".$telefono.",'".$contrasena."'");
                        return  response()->json(['data' => 'Usuario modifico correctamente'], 200);
                    }else{
                        return  response()->json(['error' => 'El usuario no existe'], 406);
                    }
                }else {
                    return  response()->json(['error' => 'Faltan datos'], 406);
                }
            }catch(\Illuminate\Database\QueryException $e){
                return  response()->json(['error' => $e], 406);
            }
    }

    public function editarUsuarioTipo($id, Request $request){

        
    }

    public function eliminarUsuario($id){

        if($id==null){
            return  response()->json(['error' => 'Faltan datos'], 406);
        }else{
            try{
                $data = DB::table('usuario')->select('id')->where('id', '=', $id)->first();
                if($data!=null){
                    DB::insert("exec pa_eliminar_usuario ".$id."");
                }else {
                    return  response()->json(['error' => 'El usuario no existe'], 406);
                }
            }catch(\Illuminate\Database\QueryException $e){
                return  response()->json(['error' => $e], 406);
            }
        }
        return  response()->json(['data' => 'Usuario eliminado correctamente'], 200);
    }
}
