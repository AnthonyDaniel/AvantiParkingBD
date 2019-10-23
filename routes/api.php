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

    /*
    Get http://127.0.0.1:8000/api/espacio
    */
    Route::get('espacio','Espacio@obtenerEspacios');

    /*
    Get http://127.0.0.1:8000/api/espacio_disponible
    */
    Route::get('espacio_disponible','Espacio@obtenerEspaciosDisponibles');

    /*
    Get http://127.0.0.1:8000/api/espacio_no_disponible
    */
    Route::get('espacio_no_disponible','Espacio@obtenerEspaciosNoDisponibles');

    /*
    Get http://127.0.0.1:8000/api/espacio_regular
    */
    Route::get('espacio_regular','Espacio@obtenerEspaciosRegular');

    /*
    Get http://127.0.0.1:8000/api/espacio_especial
    */
    Route::get('espacio_especial','Espacio@obtenerEspaciosEspecial');

    /*
    Post http://127.0.0.1:8000/api/espacio
    {
        "nombre": 1,
        "parqueo": 1
    }
    */
    Route::post('espacio','Espacio@guardarEspacio');

    /*
    Put http://127.0.0.1:8000/api/espacio/1
      {
        "nombre": 100,
        "estado": 1,
        "tipo_espacio":"especial"
    }
    */
    Route::put('espacio/{id}','Espacio@editarEspacio');

    /*
    Delete http://127.0.0.1:8000/api/espacio/1
    */
    Route::delete('espacio/{id}','Espacio@eliminarEspacios');
    /*------------------------------Fin Espacio--------------------------------------- */ 
    /*------------------------------Vehiculo   --------------------------------------- */ 

    /*
    get http://127.0.0.1:8000/api/vehiculo
    */
    Route::get('vehiculo','Vehiculo@obtenerVehiculos');

    /*
    post http://127.0.0.1:8000/api/vehiculo
    {
        "placa": "T823",
        "marca": "Toyota",
        "modelo":"4R",
        "usuario":"anthony"
    }
    */
    Route::post('vehiculo','Vehiculo@guardarVehiculo');

    /*
    put http://127.0.0.1:8000/api/vehiculo/T823
    {
        "marca": "Toyota",
        "modelo":"4R"
    }
    */
    Route::put('vehiculo/{id}','Vehiculo@editarVehiculo');

    /*
    delete http://127.0.0.1:8000/api/vehiculo/T823
    */
    Route::delete('vehiculo/{id}','Vehiculo@eliminarVehiculo');
    /*------------------------------Fin Vehiculo-------------------------------------- */ 
    /*------------------------------Reserva     -------------------------------------- */ 

    /*
    get http://127.0.0.1:8000/api/reserva
    */
    Route::get('reserva','Reserva@obtenerReservas');

    /*
    post http://127.0.0.1:8000/api/reserva
    {
        "espacio": "43",
        "fecha_reserva": "2019-09-01",
        "hora_inicio": "15:55",
        "hora_final": "16:55",
        "usuario": "anthony",
        "vehiculo": "T823"
    }
    */
    Route::post('reserva','Reserva@guardarVehiculo');

    /*
    delete http://127.0.0.1:8000/api/reserva/1
    */
    Route::delete('reserva/{id}','Reserva@eliminarReserva');
    /*------------------------------Reserva  FIN-------------------------------------- */ 
});
