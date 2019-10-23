<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Espacio extends Model
{
    protected $table = 'espacio';

    protected $fillable = [
       'id_espacio','nombre','estado','tipo_espacio','parqueo'
   ];
}
