<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class Espacio extends Controller
{
    public function __construct()
    { }

    public function obtenerEspacios()
    {
        return DB::select('SELECT * FROM view_espacio');
    }

    public function obtenerEspaciosDisponibles()
    {
        return DB::select('SELECT * FROM view_espacio_disponibles');
    }

    public function obtenerEspaciosNoDisponibles()
    {
        return DB::select('SELECT * FROM view_espacio_no_disponibles');
    }

    public function obtenerEspaciosRegular()
    {
        return DB::select('SELECT * FROM view_espacio_tipo_regular');
    }
    public function obtenerEspaciosEspecial()
    {
        return DB::select('SELECT * FROM view_espacio_tipo_especial');
    }
    public function guardarEspacio(Request $request){
        $nombre = $request->nombre;
        $parqueo = $request->parqueo;

        if($nombre==null || $parqueo==null){
            return  response()->json(['error' => 'Faltan datos'], 406);
        }else{
            try{
                DB::insert("exec pa_agregar_espacio ".$nombre.",".$parqueo."");
            }catch(\Illuminate\Database\QueryException $e){
                return  response()->json(['error' => $e], 406);
            }
        }
        return  response()->json(['data' => 'Espacio agregado correctamente'], 200);
    }
    
    public function editarEspacio($id, Request $request){

        $nombre = $request->nombre;
        $estado = $request->estado;
        $tipo_espacio = $request->tipo_espacio;

            try{
                $data = DB::table('espacio')->select('id_espacio')->where('id_espacio', '=', $id)->first();
                if($id!=null && $nombre!=null && $estado!=null && $tipo_espacio!=null){
                    if($data!=null){
                        DB::insert("exec pa_actualizar_espacio ".$id.",".$nombre.",".$estado.",'".$tipo_espacio."'");
                        return  response()->json(['data' => 'Espacio modificado correctamente'], 200);
                    }else{
                        return  response()->json(['error' => 'El espacio no existe'], 406);
                    }
                }else {
                    return  response()->json(['error' => 'Faltan datos'], 406);
                }
            }catch(\Illuminate\Database\QueryException $e){
                return  response()->json(['error' => $e], 406);
            }
    }
    public function eliminarEspacios($id){
        if($id==null){
            return  response()->json(['error' => 'Faltan datos'], 406);
        }else{
            try{
                $data = DB::table('espacio')->select('id_espacio')->where('id_espacio', '=', $id)->first();
                if($data!=null){
                    DB::insert("exec pa_eliminar_espacio ".$id."");
                }else {
                    return  response()->json(['error' => 'EL espacio no existe'], 406);
                }
            }catch(\Illuminate\Database\QueryException $e){
                return  response()->json(['error' => $e], 406);
            }
        }
        return  response()->json(['data' => 'Espacio eliminado correctamente'], 200);
    }
}
