import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  public dataUser = {
    nombre: null,
    nombreUsuario: null,
    direccion: null,
    telefono: null,
 
  };

  public error: String;
  public success: String;
  public status: String;
  constructor() { }

  ngOnInit() {
  }
  data(data) {
    this.dataUser.nombre = data.nombre;
    this.dataUser.nombreUsuario = data.nombreUsuario;
    this.dataUser.direccion = data.direccion;
    this.dataUser.telefono = data.telefono;
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
