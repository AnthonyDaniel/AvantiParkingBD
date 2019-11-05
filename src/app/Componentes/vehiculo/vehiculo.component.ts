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
  public formVehiculo = {
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
    this.vehiculo.listarVehiculo().subscribe(data=>{
      this.data(data);
    });
    this.listar()
  }
  
  data(data) {
    var form = this.formVehiculo;
    var usuario = localStorage.getItem("usuario");
    this.formVehiculo.usuario = usuario;
  }

  onSubmit() {
    this.vehiculo.guardarVehiculo(this.formVehiculo).subscribe(
      data=>{
        Swal.fire({
          type: 'success',
          title: 'Vehiculo creado correctamente',
          showConfirmButton: false,
          timer: 1500
        });
        this.ngOnInit()
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
    var vehi;
    this.vehiculo.listarVehiculo().subscribe(
      data => {
       
        this.vehiculos=data;
        var words = this.vehiculos;
        const result = words.filter(word => word.username==this.formVehiculo.usuario);
        this.vehiculos=result;

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
    _formVehiculo.usuario=this.formVehiculo.usuario
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        cancelButton: 'btn btn-secondary'
      },
      buttonsStyling: false
    })

    Swal.fire({
      title: 'Esta seguro de eliminar?',
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
  
  modificarVehiculo(_formVehiculo) {
    _formVehiculo.usuario = this.formVehiculo.usuario;
    this.vehiculo.modificarVehiculo(_formVehiculo).subscribe(
      data => {
        Swal.fire({
          type: 'success',
          title: 'Vehiculo modificado correctamente',
          showConfirmButton: false,
          timer: 1500
        });
        this.ngOnInit();
      },
      error => {
        Swal.fire({
          type: 'error',
          title: 'El vehiculo no se pudo modificar, faltan datos o tu conexion a internet fallo',
          showConfirmButton: false,
          timer: 1500
        });
      }
    );
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
