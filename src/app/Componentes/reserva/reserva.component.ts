import { Component, OnInit } from '@angular/core';
import { VehiculoService } from 'src/app/Servicios/vehiculo.service';

import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { ParqueosService } from 'src/app/Servicios/parqueos.service';
import { EspaciosService } from 'src/app/Servicios/espacios.service';
import { SedesService } from 'src/app/Servicios/sedes.service';
import { ReservaService } from 'src/app/Servicios/reserva.service';

import * as $ from 'jquery';
@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit {

  timeStart = {hour: 13, minute: 0 };
  timeEnd = {hour: 23, minute: 59 };

  public reservas = {
    fechaReserva:null,
    horaInicio:{hour: 13, minute: 0 },
    horaFinal:{hour: 23, minute: 59 },
  }

  public confirmar  ={
    parqueo:null,
    vehiculo:null
  }

  public parqueo;
  public usuario;
  public vehiculos;
  public statusSpace:boolean = false;
  public res;

  public espacio = {
    idEspacio:null
  };
  public espacios;
  public parqueos;

  
  constructor(private _reserva: ReservaService,private calendar: NgbCalendar,private _parqueo: ParqueosService, private _espacio: EspaciosService, 
    private _sede: SedesService,
    private _vehiculo: VehiculoService) {

  }

  ngOnInit() {
    this._parqueo.obtenerParqueo().subscribe(
      data => {
        this.parqueo= data;
      },
      error => console.log(error)
    );
   
  }
  infoUser(data){
   
    this._vehiculo.listarVehiculo().subscribe(
      data => {
        this.infoVehicle(data);
      },
      error => console.log(error)
    );
    this.listar();
  }
  infoVehicle(data){
    this.vehiculos = data;
  }
  reserve(){
   
    alert( this.reservas.fechaReserva.day);
    console.log(this.reservas.fechaReserva);  

  }

  confirmarR(){
    this.statusSpace=true;
    this.seeSpaces();
    $('#OpenModal').click();
  }

  seeSpaces() {
    var i = {
      idParqueo:this.confirmar.parqueo
    }
    this._espacio.obtenerEspacios(i).subscribe(
      data => {
        this.espacios = data;
        console.log(this.espacios);
      },
      error => console.log(error)
    );
  }

  selectSpace(space){
    this.espacio = space ;
    $('#closeM').click();
  }

  reservar(){
    var i ={
      fechaReserva:this.reservas.fechaReserva.year+"-"+this.reservas.fechaReserva.month+"-"+this.reservas.fechaReserva.day,
      horaInicio:this.reservas.horaInicio.hour+":"+this.reservas.horaInicio.minute,
      horaFinal:this.reservas.horaFinal.hour+":"+this.reservas.horaFinal.minute,
      espacio:this.espacio.idEspacio,
      users:this.usuario,
      vehiculo:this.confirmar.vehiculo,
    }
    this._reserva.guardarReserva(i).subscribe(
      data=>{
        this.listar();
      },
      error=>{
        console.log(error);
      }
    );
    console.log(i);
  }
  listar(){
    this._reserva.listarReservas().subscribe(
      data=>{
        this.res = data;
      },
      error=>{
        console.log(error);
      }
    );
  }

  deleteReserve(s){
    this._reserva.eliminarReserva(s).subscribe(
      data=>{
        this.listar();
      },
      error=>{
        console.log(error);
      }
    );
  }
}


