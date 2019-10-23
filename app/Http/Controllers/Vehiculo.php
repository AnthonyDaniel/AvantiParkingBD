<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class Vehiculo extends Controller
{
    public function __construct()
    { }

    public function obtenerVehiculos()
    {
        return DB::select('SELECT * FROM view_vehiculo');
    }

    public function guardarVehiculo(Request $request){
        $placa = $request->placa;
        $marca = $request->marca;
        $modelo = $request->modelo;
        $usuario = $request->usuario;

        if($placa==null || $marca==null || $modelo==null || $usuario==null){
            return  response()->json(['error' => 'Faltan datos'], 406);
        }else{
            try{
                DB::insert("exec pa_agregar_vehiculo '".$placa."','".$marca."','".$modelo."','".$usuario."'");
            }catch(\Illuminate\Database\QueryException $e){
                return  response()->json(['error' => $e], 406);
            }
        }
        return  response()->json(['data' => 'Vehiculo agregado correctamente'], 200);
    }
    
    public function editarVehiculo($id, Request $request){

        $marca = $request->marca;
        $modelo = $request->modelo;

            try{
                $data = DB::table('vehiculo')->select('placa')->where('placa', '=', $id)->first();
                if($id!=null && $marca!=null && $modelo!=null){
                    if($data!=null){
                        DB::insert("exec pa_actualizar_vehiculo '".$id."','".$marca."','".$modelo."'");
                        return  response()->json(['data' => 'Vehiculo modificado correctamente'], 200);
                    }else{
                        return  response()->json(['error' => 'El Vehiculo no existe'], 406);
                    }
                }else {
                    return  response()->json(['error' => 'Faltan datos'], 406);
                }
            }catch(\Illuminate\Database\QueryException $e){
                return  response()->json(['error' => $e], 406);
            }
    }
    public function eliminarVehiculo($id){
        if($id==null){
            return  response()->json(['error' => 'Faltan datos'], 406);
        }else{
            try{
                $data = DB::table('vehiculo')->select('placa')->where('placa', '=', $id)->first();
                if($data!=null){
                    DB::insert("exec pa_eliminar_vehiculo ".$id."");
                }else {
                    return  response()->json(['error' => 'EL vehiculo no existe'], 406);
                }
            }catch(\Illuminate\Database\QueryException $e){
                return  response()->json(['error' => $e], 406);
            }
        }
        return  response()->json(['data' => 'Vehiculo eliminado correctamente'], 200);
    }
}
