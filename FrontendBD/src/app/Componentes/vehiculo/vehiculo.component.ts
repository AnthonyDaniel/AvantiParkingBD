import { Component, OnInit } from '@angular/core';
import { VehiculoService } from 'src/app/Servicios/vehiculo.service';

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

  constructor(  private vehiculo: VehiculoService,) { }
  public error: String;
  public success: String;
  public status: String;


  ngOnInit() {
  }
  
  handleError(error) {
    this.error = error.error.errors;
  }


  data(data) {
    this.form.usuario = data.email;
    console.log(this.form);
    
  }

  onSubmit() {
  
  }

  
  listar() {
   
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
