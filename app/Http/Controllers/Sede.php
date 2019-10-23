<?php

namespace App\Http\Controllers;
use App\Sede as s;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class Sede extends Controller
{
    public function __construct()
    { }

    public function obtenerSedes()
    {
        return DB::select('SELECT * FROM view_sede');
    }

    public function guardarSedes(Request $request){
        $nombre = $request->nombre;
        $direccion = $request->direccion;

        if($nombre==null || $direccion==null){
            return  response()->json(['error' => 'Faltan datos'], 406);
        }else{
            try{
                DB::insert("exec pa_agregar_sede '".$nombre."','".$direccion."'");
            }catch(\Illuminate\Database\QueryException $e){
                return  response()->json(['error' => $e], 406);
            }
        }
        return  response()->json(['data' => 'Sede agregado correctamente'], 200);
    }
    
    public function editarSedes($id, Request $request){

        $nombre = $request->nombre;
        $direccion = $request->direccion;
            try{
                $data = DB::table('sede')->select('id_sede')->where('id_sede', '=', $id)->first();
                if($id!=null && $nombre!=null && $direccion!=null){
                    if($data!=null){
                        DB::insert("exec pa_actualizar_sede ".$id.",'".$nombre."','".$direccion."'");
                        return  response()->json(['data' => 'Sede modifico correctamente'], 200);
                    }else{
                        return  response()->json(['error' => 'La Sede no existe'], 406);
                    }
                }else {
                    return  response()->json(['error' => 'Faltan datos'], 406);
                }
            }catch(\Illuminate\Database\QueryException $e){
                return  response()->json(['error' => $e], 406);
            }
    }
    public function eliminarSedes($id){
        if($id==null){
            return  response()->json(['error' => 'Faltan datos'], 406);
        }else{
            try{
                $data = DB::table('sede')->select('id_sede')->where('id_sede', '=', $id)->first();
                if($data!=null){
                    DB::insert("exec pa_eliminar_sede ".$id."");
                }else {
                    return  response()->json(['error' => 'La sede no existe'], 406);
                }
            }catch(\Illuminate\Database\QueryException $e){
                return  response()->json(['error' => $e], 406);
            }
        }
        return  response()->json(['data' => 'Sede eliminado correctamente'], 200);
    }
}
