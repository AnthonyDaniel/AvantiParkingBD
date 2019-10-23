<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Parqueo extends Model
{
    protected $table = 'parqueo';

    protected $fillable = [
       'id_parqueo','nombre','zona','cantidad','comienzo','sede'
   ];
}
