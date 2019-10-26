import { Component, OnInit } from '@angular/core';
import { VehiculoService } from 'src/app/Servicios/vehiculo.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Servicios/auth.service';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.component.html',
  styleUrls: ['./vehiculo.component.css']
})
export class VehiculoComponent implements OnInit {
  public form = {
    placa: null,
    modelo: null,
    marca: null,
    usuario: null,
  };

  public vehicles;
  public urlImg;

  constructor(  private vehiculo: VehiculoService,public auth:AuthService, private router: Router) { }
  public error: String;
  public success: String;
  public status: String;

  public vehiculos;

  ngOnInit() {
    this.listar();
  }
  
  handleError(error) {
    this.error = error.error.errors;
  }

  
  data(data) {
    var form = this.form;
    var usuario = localStorage.getItem("usuario");
    
      data.forEach(function (value) {
        if(value.username == usuario){
          form.usuario = value.username;
        console.log(form.usuario)
        }
    });
  
    this.form = form;
  
  }
  onSubmit() {
    this.vehiculo.guardarVehiculo(this.form).subscribe(
      data=>{
        Swal.fire({
          type: 'success',
          title: 'Vehiculo creado correctamente',
          showConfirmButton: false,
          timer: 1500
        });
        
      },
      error=>{
        Swal.fire({
          type: 'error',
          title: 'El vehiculo no puede ser creado',
          showConfirmButton: false,
          timer: 1500
        });
      }
    );
  }

  
  listar() {
    this.vehiculo.listarVehiculo().subscribe(
      data => {
        this.vehiculos = data;
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
  
  eliminarVehiculo(_formVehiculo){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        cancelButton: 'btn btn-secondary'
      },
      buttonsStyling: false
    })

    Swal.fire({
      title: 'Esta segur de eliminar?',
      text: "No volveras a la  recuperar esta informacion ni relacionada con ella!!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EF4023',
      confirmButtonText: 'Eliminar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.vehiculo.eliminarVehiculo(_formVehiculo).subscribe(
          data => {
            this.ngOnInit();
            Swal.fire(
              'Eliminado!',
              'Vehiculo eliminado.',
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
}
