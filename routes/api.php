<?php

use Illuminate\Http\Request;

Route::group([

    'middleware' => 'api',

], function ($router) {
    /*----------------------------------------------------------USUARIO-------------------------------------------- */
    /*
     Get http://127.0.0.1:8000/api/usuario
    */
    Route::get('usuario', 'Usuario@obtenerUsuarios');    
    
    /* 
    Post http://127.0.0.1:8000/api/usuario
        {
    	"username":"anthony",
    	"id":1010,
    	"nombre":"Daniel",
    	"direccion":"Liberia Centro",
    	"telefono":7832,
    	"contrasena":1234
        }
    */
    Route::post('usuario','Usuario@guardarUsuarios');

    /*
    Delete http://127.0.0.1:8000/api/usuario/604550257
    */
    Route::delete('usuario/{id}','Usuario@eliminarUsuario');

    /*
    Put http://127.0.0.1:8000/api/usuario/604550257
        {
    	"nombre":"Daniela",
    	"direccion":"Liberia curime",
    	"telefono":742,
    	"contrasena":14234
    }
    */
    Route::put('usuario/{id}','Usuario@editarUsuario');

    /*
    Put http://127.0.0.1:8000/api/usuariotipo/604550257
    {
        "tipo" : 1
    }
     */
    Route::put('usuariotipo/{id}','Usuario@editarUsuarioTipo');
    /*-------------------------------------------------------FIN USUARIO------------------------------------------- */
    /*----------------------------------------------------------SEDE-------------------------------------------- */
    
    /*
    Get http://127.0.0.1:8000/api/sede
     */
    Route::get('sede','Sede@obtenerSedes');
    /*
    Post http://127.0.0.1:8000/api/sede
    {
    	"nombre":"N",
    	"direccion":12
    }
    */
    Route::post('sede','Sede@guardarSedes');

    /*
    Put http://127.0.0.1:8000/api/sede/1
    {
    	"nombre":"N",
    	"direccion":12
    }
    */
    Route::put('sede/{id}','Sede@editarSedes');

    /*
    Delete http://127.0.0.1:8000/api/sede/1
    */
    Route::delete('sede/{id}','Sede@eliminarSedes');

    /*-------------------------------Parqueos---------------------------------------- */

    /*
    Get http://127.0.0.1:8000/api/parqueo
    */
    Route::get('parqueo','Parqueo@obtenerParqueos');
    /*
    Post http://127.0.0.1:8000/api/parqueo
        {
        "nombre": "PatioB",
        "zona": "AB",
        "cantidad": "20",
        "comienzo": "10",
        "sede": "1"
    }
    */
    Route::post('parqueo','Parqueo@guardarParqueo');

    /*
    Put http://127.0.0.1:8000/api/parqueo/1
    {
        "nombre": "PatioBb",
        "zona": "ABb",
        "sede": "2"
    }
    */
    Route::put('parqueo/{id}','Parqueo@editarParqueo');

    /*
    delete http://127.0.0.1:8000/api/parqueo/1

    */
    Route::delete('parqueo/{id}','Parqueo@eliminarParqueos');
    /*------------------------------Fin de los parqueos ------------------------------ */ 
    /*------------------------------Espacio------------ ------------------------------ */ 

    
    /*------------------------------Fin Espacio--------------------------------------- */ 
});
