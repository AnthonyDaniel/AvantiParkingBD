<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Reserva extends Model
{
    protected $table = 'reserva';

    protected $fillable = [
       'id_reserva','espacio','fecha_reserva',
       'hora_final','hora_inicio','usuario','vehiculo'
   ];
}
