<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class Reserva extends Controller
{
    public function __construct()
    { }

    public function obtenerReservas()
    {
        return DB::select('SELECT * FROM vista_reserva');
    }

    public function guardarVehiculo(Request $request){
        $espacio = $request->espacio;
        $fecha_reserva = $request->fecha_reserva;
        $hora_inicio = $request->hora_inicio;
        $hora_final = $request->hora_final;
        $usuario = $request->usuario;
        $vehiculo = $request->vehiculo;

        if($espacio==null || $fecha_reserva==null || $hora_inicio==null || $hora_final==null || $usuario==null || $vehiculo==null){
            return  response()->json(['error' => 'Faltan datos'], 406);
        }else{
            try{
                DB::insert("exec pa_agregar_reserva '".$espacio."','".$fecha_reserva."','".$hora_inicio."','".$hora_final."','".$usuario."','".$vehiculo."'");
            }catch(\Illuminate\Database\QueryException $e){
                return  response()->json(['error' => $e], 406);
            }
        }
        return  response()->json(['data' => 'Reserva agregada correctamente'], 200);
    }
    public function eliminarReserva($id){
        if($id==null){
            return  response()->json(['error' => 'Faltan datos'], 406);
        }else{
            try{
                $data = DB::table('reserva')->select('id_reserva')->where('id_reserva', '=', $id)->first();
                if($data!=null){
                    DB::insert("exec pa_eliminar_reserva ".$id."");
                }else {
                    return  response()->json(['error' => 'La reserva no existe'], 406);
                }
            }catch(\Illuminate\Database\QueryException $e){
                return  response()->json(['error' => $e], 406);
            }
        }
        return  response()->json(['data' => 'Reserva eliminado correctamente'], 200);
    }
}
