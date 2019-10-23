<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class Parqueo extends Controller
{
    public function __construct()
    { }

    public function obtenerParqueos()
    {
        return DB::select('SELECT * FROM view_parqueo');
    }

    public function guardarParqueo(Request $request){
        $nombre = $request->nombre;
        $zona = $request->zona;
        $cantidad = $request->cantidad;
        $comienzo = $request->comienzo;
        $sede = $request->sede;

        if($nombre==null || $zona==null || $cantidad==null || $comienzo==null || $sede==null){
            return  response()->json(['error' => 'Faltan datos'], 406);
        }else{
            try{
                DB::insert("exec pa_agregar_parqueo '".$nombre."','".$zona."',".$cantidad.",".$comienzo.",".$sede."");
            }catch(\Illuminate\Database\QueryException $e){
                return  response()->json(['error' => $e], 406);
            }
        }
        return  response()->json(['data' => 'Parqueo agregado correctamente'], 200);
    }
    
    public function editarParqueo($id, Request $request){

        $nombre = $request->nombre;
        $zona = $request->zona;
        $sede = $request->sede;

            try{
                $data = DB::table('parqueo')->select('id_parqueo')->where('id_parqueo', '=', $id)->first();
                if($id!=null && $nombre!=null && $zona!=null && $sede!=null){
                    if($data!=null){
                        DB::insert("exec pa_actualizar_parqueo ".$id.",'".$nombre."','".$zona."',".$sede."");
                        return  response()->json(['data' => 'Parqueo modificado correctamente'], 200);
                    }else{
                        return  response()->json(['error' => 'El Parqueo no existe'], 406);
                    }
                }else {
                    return  response()->json(['error' => 'Faltan datos'], 406);
                }
            }catch(\Illuminate\Database\QueryException $e){
                return  response()->json(['error' => $e], 406);
            }
    }
    public function eliminarParqueos($id){
        if($id==null){
            return  response()->json(['error' => 'Faltan datos'], 406);
        }else{
            try{
                $data = DB::table('parqueo')->select('id_parqueo')->where('id_parqueo', '=', $id)->first();
                if($data!=null){
                    DB::insert("exec pa_eliminar_parqueo ".$id."");
                }else {
                    return  response()->json(['error' => 'EL parqueo no existe'], 406);
                }
            }catch(\Illuminate\Database\QueryException $e){
                return  response()->json(['error' => $e], 406);
            }
        }
        return  response()->json(['data' => 'Parqueo eliminado correctamente'], 200);
    }
}
