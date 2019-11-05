import { Component, OnInit } from '@angular/core';
import { VehiculoService } from 'src/app/Servicios/vehiculo.service';

import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { ParqueosService } from 'src/app/Servicios/parqueos.service';
import { EspaciosService } from 'src/app/Servicios/espacios.service';
import { SedesService } from 'src/app/Servicios/sedes.service';
import { ReservaService } from 'src/app/Servicios/reserva.service';
import Swal from 'sweetalert2';
import * as $ from 'jquery';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit {

  timeStart = { hour: 13, minute: 0 };
  timeEnd = { hour: 23, minute: 59 };

  public reservas = {
    fechaReserva: { year: 2019, month: 11, day: 1 },
    horaInicio: { hour: 13, minute: 0 },
    horaFinal: { hour: 23, minute: 59 },
  }

  public confirmar = {
    parqueo: null,
    vehiculo: null,
    tipo_espacio: null,
    estado: '0',
    usuario: null
  }

  public parqueo;
  public vehiculos:any;
  public fecha1;
  public estadoEspacio: boolean = false;
  public res;

  public espacio = {
    id_espacio: null
  };

  public espacios: any;
  public parqueos:any;

  constructor(private _reserva: ReservaService, private calendar: NgbCalendar, private _parqueo: ParqueosService, private _espacio: EspaciosService,
  private _vehiculo: VehiculoService) { }
  public error: String;
  public success: String;
  public status: String;

  ngOnInit() {
    this.listar();
    this._parqueo.obtenerParqueo().subscribe(
      data => { this.parqueos = data },
      error => { this._parqueo.obtenerParqueo().subscribe(data => { this.parqueos = data }) }
    );
    this._vehiculo.listarVehiculo().subscribe(data => {
      this.obtenerUsuario(data);
    });
    this._vehiculo.listarVehiculo().subscribe(
      data => {
        this.vehiculos = data;
        var words = this.vehiculos;
        const result = words.filter(word => word.username==this.confirmar.usuario);
        this.vehiculos=result;
      },
      error => {
        console.log(error)
      }
    );
    
  }

  obtenerUsuario(data) {
    var usuario = localStorage.getItem("usuario");
    this.confirmar.usuario = usuario;
  }

  confirmarR() {
    this.estadoEspacio = true;
    this.verEspacios();
    $('#OpenModal').click();
  }

  verEspacios() {
    var fechaReserva = this.reservas.fechaReserva.year + "-" + this.reservas.fechaReserva.month + "-" + this.reservas.fechaReserva.day;
    var horaInicio = this.reservas.horaInicio.hour + ":" + this.reservas.horaInicio.minute;
    var horaFinal = this.reservas.horaFinal.hour + ":" + this.reservas.horaFinal.minute;
    var i = {
      parqueo: this.confirmar.parqueo,
      tipo_espacio: this.confirmar.tipo_espacio,
      estado: this.confirmar.estado,
      fecha: fechaReserva,
      horaI: horaInicio,
      horaF: horaFinal
    }
    this._espacio.obtenerEspacios(i).subscribe(
      data => {
        this.llenarTablaEspacios(data);
      },
      error =>{
        Swal.fire({
          type: 'error',
          title: 'No existen espacios en este parqueo',
          showConfirmButton: false,
          timer: 1500
        });
      } 
    );
  }

  llenarTablaEspacios(data) {
    if (data.data.length == 0) {
      Swal.fire({
        type: 'error',
        title: 'No existen espacios en este parqueo',
        showConfirmButton: false,
        timer: 1500
      });
    }
    this.espacios = data.data;
  }

  seleccionarEspacio(space) {
    this.espacio = space;
    $('#closeM').click();
  }

  reservar() {
    var fechaReserva = this.reservas.fechaReserva.year + "-" + this.reservas.fechaReserva.month + "-" + this.reservas.fechaReserva.day;
    var horaI = this.reservas.horaInicio.hour + ":" + this.reservas.horaInicio.minute;
    var horaF = this.reservas.horaFinal.hour + ":" + this.reservas.horaFinal.minute;
    var i = {
      espacio: this.espacio.id_espacio,
      fecha_reserva: fechaReserva,
      hora_inicio: horaI,
      hora_final: horaF,
      usuario: this.confirmar.usuario,
      vehiculo: this.confirmar.vehiculo,
    }
    this._reserva.guardarReserva(i).subscribe(
      data => {
        Swal.fire({
          type: 'success',
          title: 'Reserva agregada',
          showConfirmButton: false,
          timer: 1500
        });
        this.listar();
      },
      error => {
        Swal.fire({
          type: 'error',
          title: 'La reserva no se puede agregar',
          showConfirmButton: false,
          timer: 1500
        });
      }
    );
  }

  listar() {
    this._reserva.listarReservas().subscribe(
      data => {
        this.res = data;
      },
      error => {
        Swal.fire({
          type: 'error',
          title: 'Error del sistema',
          showConfirmButton: false,
          timer: 1500
        });
      }
    );
  }

  eliminarReserva(s) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        cancelButton: 'btn btn-secondary'
      },
      buttonsStyling: false
    })

    Swal.fire({
      title: 'Esta seguro de eliminar?',
      text: "No volveras a la recuperar esta informacion ni relacionada con ella!!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EF4023',
      confirmButtonText: 'Eliminar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this._reserva.eliminarReserva(s).subscribe(
          data => {
            this.ngOnInit();
            Swal.fire(
              'Eliminada!',
              'Reserva eliminada.',
              'success'
            )
          }
        )
      }
    })
  }

  responseSuccess(data) {
    this.success = data.data;
    this.status = "success";
  }
  responseError(error) {
    this.error = error.error.error;
    this.status = "error";
  }
  handleError(error) {
    this.error = error.error.errors;
  }
}


