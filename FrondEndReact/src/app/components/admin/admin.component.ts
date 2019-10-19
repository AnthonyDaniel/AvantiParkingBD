import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import * as $ from 'jquery';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private admin: AdminService) {
    this.formUsuario.contrasena = "1234";
    this.formUsuario.usuario = "sa";
  }

  filterUsers = '';

  public formUsuario = {
    username: null,
    id: null,
    nombre:null,
    direccion: null,
    telefono: null,
    tipo:null,
    contra: null,
    usuario: null,
    contrasena: null
  };


  public users;
  ngOnInit() {
    this.admin.obtenerUsuarios().subscribe(
      data => {
        this.users = data;
      }
    );
  }

  registrarUsuario() {
    console.log(this.formUsuario);
    this.admin.registrarUsuarios(this.formUsuario).subscribe(
      data => {
        if (data == "Se guardo correctamente.") {
          Swal.fire({
            type: 'success',
            title: 'Se guardo correctamente',
            showConfirmButton: false,
            timer: 1500
          })
          this.clear();
        } else {
          Swal.fire({
            type: 'error',
            title: 'No se pudo guardar, lo que estas ingresando, ya existe',
            showConfirmButton: false,
            timer: 1500
          })
          this.clear();
        }

      }
    );
  }

  administradorUsuario(user) {
    Swal.fire({
      title: '¿Estas seguro de darle o quitarle privilegios a este usuario?',
      text: "Si le das acceso de administrador a este usuario, el podra agregar, modificar y cualquier sede, parqueo o espacios del sistema",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EF4023',
      confirmButtonText: 'Si, otorgar ahora!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {

        if (user.Tipo != 1)
          user.Tipo = 1;
        else
          user.Tipo = 0;
        
          this.formUsuario.tipo = user.Tipo;
          this.formUsuario.username = user.Usuario;
          this.formUsuario.telefono = user.Telefono;
          this.formUsuario.nombre = user.Nombre;
          this.formUsuario.direccion = user.Direccion;
          this.formUsuario.id =user.ID;
        
          console.log(this.formUsuario);
        
        this.admin.modificarUsuario(user).subscribe(
          data => {
            console.log(data);
            if (data == "Se Elimino correctamente") {
              Swal.fire({
                type: 'success',
                title: 'Se elimino correctamente',
                showConfirmButton: false,
                timer: 1500
              })
              this.clear();
            } else {
              Swal.fire({
                type: 'error',
                title: 'No se pudo eliminar',
                showConfirmButton: false,
                timer: 1500
              })
              this.clear();
            }
          },
          error => {
            Swal.fire({
              type: 'error',
              title: 'No se pudo otorgar privilegios',
              showConfirmButton: false,
              timer: 1500
            })
          }
        );
      }
    });
  }

  eliminarUsuario(user) {
    Swal.fire({
      title: '¿Estas seguro de eliminar al usuario?',
      text: "Si eliminas a este usuario, se eliminara permanentemente, con todos los datos que esten asociados a él",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EF4023',
      confirmButtonText: 'Si, eliminar ahora!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.admin.eliminarUsuario(user.ID).subscribe(
          data => {
            if (data == "Se Elimino correctamente") {
              Swal.fire({
                type: 'success',
                title: 'Se elimino correctamente',
                showConfirmButton: false,
                timer: 1500
              })
              this.clear();
            } else {
              Swal.fire({
                type: 'error',
                title: 'No se pudo eliminar',
                showConfirmButton: false,
                timer: 1500
              })
              this.clear();
            }
          },
          error => {
            Swal.fire({
              type: 'error',
              title: 'No se pudo eliminar',
              showConfirmButton: false,
              timer: 1500
            })
          }
        );
      }
    });
  }

  clear() {
    this.formUsuario.username = null;
    this.formUsuario.id = null;
    this.formUsuario.direccion = null;
    this.formUsuario.telefono = null;
    this.formUsuario.contra = null;
    $(".close").click();
    this.ngOnInit();
  }

}
