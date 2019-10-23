import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  public form = {
    email: null,
    nombre: null,
    direccion:null,
    telefono:null,
    contrasena: null,
    confirmar_contrasena: null
  };
  public error = [];

  constructor() { }
  
  handleError(error) {
    this.error = error.error.errors;
  }

  ngOnInit() {
  }

}
