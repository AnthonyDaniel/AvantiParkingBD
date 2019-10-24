import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/Servicios/usuario.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Servicios/auth.service';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  public dataUser = {
    nombre: null,
    username: null,
    direccion: null,
    telefono: null,
    id:null,
    contrasena:null
  };

  public error: String;
  public success: String;
  public status: String;
  constructor(public u:UsuarioService, public auth:AuthService, private router: Router) { }

  ngOnInit() {
    this.u.obtenerUsuarios().subscribe(data=>{
      this.data(data);
    });
  }

  data(data) {
    var form = this.dataUser;
    var usuario = localStorage.getItem("usuario");
    if(usuario==null || usuario == ''){
      this.auth.changeAuthStatus(false);
      this.auth.changeAdminStatus(false);
      localStorage.setItem('usuario','');
      localStorage.setItem('tipo','0');
      Swal.fire({
        type: 'error',
        title: 'Error en la sesión, será redirigido al login',
        showConfirmButton: false,
        timer: 1500
      });
      this.router.navigateByUrl('/login');
    }else{
      data.forEach(function (value) {
        if(value.username == usuario){
          form.nombre = value.nombre;
          form.username = value.username;
          form.telefono = value.telefono;
          form.direccion = value.direccion;
          form.id = value.id;
          form.contrasena = value.contrasena;
        }
    });
    if(form.username == '' || form.username == null){
      this.auth.changeAuthStatus(false);
      this.auth.changeAdminStatus(false);
      localStorage.setItem('usuario','');
      localStorage.setItem('tipo','0');
      Swal.fire({
        type: 'error',
        title: 'Error en la sesión, será redirigido al login',
        showConfirmButton: false,
        timer: 1500
      });
      this.router.navigateByUrl('/login');
    }
    this.dataUser = form;
    }
  }

  modificarNombre(){
    Swal.fire({
      title: '¿Estas seguro que deseas modificar el nombre?',
      text: "",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#89CA8E',
      cancelButtonColor: '#EF4023',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Modificar ahora!'
    }).then((result) => {
      if (result.value) {
        this.u.modificarUsuario(this.dataUser).subscribe(
          data=>{
            Swal.fire({
              type: 'success',
              title: 'Se modifico correctamente el nombre',
              showConfirmButton: false,
              timer: 1500
            });
          },
          error=>{
            Swal.fire({
              type: 'error',
              title: 'No se pudo modificar',
              showConfirmButton: false,
              timer: 1500
            });
          }
        );
      }
    })
  }
  modificarDireccion(){
    Swal.fire({
      title: '¿Estas seguro que deseas modificar el direccion?',
      text: "",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#89CA8E',
      cancelButtonColor: '#EF4023',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Modificar ahora!'
    }).then((result) => {
      if (result.value) {
        this.u.modificarUsuario(this.dataUser).subscribe(
          data=>{
            Swal.fire({
              type: 'success',
              title: 'Se modifico correctamente el direccion',
              showConfirmButton: false,
              timer: 1500
            });
          },
          error=>{
            Swal.fire({
              type: 'error',
              title: 'No se pudo modificar',
              showConfirmButton: false,
              timer: 1500
            });
          }
        );
      }
    })
  }

  modificarTelefono(){
    Swal.fire({
      title: '¿Estas seguro que deseas modificar el telefono?',
      text: "",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#89CA8E',
      cancelButtonColor: '#EF4023',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Modificar ahora!'
    }).then((result) => {
      if (result.value) {
        this.u.modificarUsuario(this.dataUser).subscribe(
          data=>{
            Swal.fire({
              type: 'success',
              title: 'Se modifico correctamente el telefono',
              showConfirmButton: false,
              timer: 1500
            });
          },
          error=>{
            Swal.fire({
              type: 'error',
              title: 'No se pudo modificar el telefono',
              showConfirmButton: false,
              timer: 1500
            });
          }
        );
      }
    })
  }

  eliminar(){
    Swal.fire({
      title: '¿Estas seguro que deseas eliminar esta cuenta?',
      text: "Perderá la cuenta de manera permanente",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EF4023',
      cancelButtonColor: '#89CA8E',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Eliminar ahora!'
    }).then((result) => {
      if (result.value) {
        this.u.eliminar(this.dataUser).subscribe(
          data=>{
            Swal.fire({
              type: 'success',
              title: 'Se elimino la cuenta',
              showConfirmButton: false,
              timer: 1500
            });
            this.auth.changeAuthStatus(false);
            this.auth.changeAdminStatus(false);
            localStorage.setItem('tipo','0');
            localStorage.setItem('usuario','');
            this.router.navigateByUrl('/login');
          },
          error=>{
            Swal.fire({
              type: 'error',
              title: 'No se pudo eliminar, posiblemente tenga otros componentes asociados a su cuenta, como vehiculos, reservas, entre otros',
              showConfirmButton: false,
              timer: 1500
            });
          }
        );
      }
    })
  }
}
