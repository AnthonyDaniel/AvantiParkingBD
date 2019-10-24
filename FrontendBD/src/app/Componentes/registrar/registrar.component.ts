import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/Servicios/usuario.service';
import { AuthService } from 'src/app/Servicios/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  public form = {
    username: null,
    nombre: null,
    id:null,
    direccion:null,
    telefono:null,
    contrasena: null,
    confirmar_contrasena: null
  };

  constructor(public u:UsuarioService, public auth:AuthService, private router: Router) { }
  
  ngOnInit() {
  }

  onSubmit(){
    if(this.form.contrasena != this.form.confirmar_contrasena){
      Swal.fire({
        type: 'error',
        title: 'La contraseña es diferente al momento de confirmarla',
        showConfirmButton: false,
        timer: 1500
      });
    }
    this.u.guardar(this.form).subscribe(
      data=>{
        Swal.fire({
          type: 'success',
          title: 'Usuario creado correctamente, te enviaremos al login, para que te puedas loguear',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigateByUrl('/login');
      },
      error=>{
        Swal.fire({
          type: 'error',
          title: 'El usuario no puede ser creado,.. Puede causarse al usar un username ya utilizado o un id ya utilizado',
          showConfirmButton: false,
          timer: 1500
        });
      }
    );
  }

}
