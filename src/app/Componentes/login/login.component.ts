import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/Servicios/usuario.service';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/Servicios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form = { 
    username: null,
    contrasena: null
  };

  constructor(public u:UsuarioService, public auth:AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(){
    this.u.obtenerUsuarios().subscribe(data=>{
      this.iniciarSesion(data);
    });
  }

  iniciarSesion(data){
    var form = this.form;
    data.forEach(function (value) {
      if(value.username == form.username && value.contrasena == form.contrasena){
        localStorage.setItem('usuario',value.username);
        localStorage.setItem('tipo',value.tipo);
        Swal.fire({
          type: 'success',
          title: 'Bienvenido a AvantiParking',
          showConfirmButton: false,
          timer: 1500
        })
      }
  });
  if(localStorage.getItem('usuario') == null || localStorage.getItem('usuario') == ''){
    Swal.fire({
      type: 'error',
      title: 'Su correo o contraseña estan incorrectos',
      showConfirmButton: false,
      timer: 1500
    });
    this.form.username = '';
    this.form.contrasena = '';
  }else{
    this.auth.changeAuthStatus(true);
    if(localStorage.getItem("tipo") == '1'){
      this.auth.changeAdminStatus(true);
    }
    this.router.navigateByUrl('/perfil');
  }
  }
}
