import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from 'src/app/Servicios/usuario.service';
import Swal from 'sweetalert2';
import { SedesService } from 'src/app/Servicios/sedes.service';
import { ParqueosService } from 'src/app/Servicios/parqueos.service';
@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {

  public form = {
    username: null,
    nombre: null,
    id: null,
    direccion: null,
    telefono: null,
    contrasena: null,
    zona:null,
    comienzo:null,
    sede:null,
    cantidad:null
  };


  public usuarios: any;
  public sedes: any;
  public parqueos: any;
  public espacios: any;

  constructor(public u: UsuarioService, public s: SedesService, public p: ParqueosService) { }

  ngOnInit() {
    this.u.obtenerUsuarios().subscribe(data => {this.usuarios = data});
    this.s.obtenerSedes().subscribe(data => {this.sedes = data});
    this.p.obtenerParqueo().subscribe(
      data => {this.parqueos = data},
      error=>{this.p.obtenerParqueo().subscribe(data => {this.parqueos = data})}
      );
    
    this.clean();
  }

  onSubmit() {
    if (this.form.username == null ||
      this.form.nombre == null ||
      this.form.id == null ||
      this.form.direccion == null ||
      this.form.telefono == null ||
      this.form.contrasena == null ||
      this.form.username == '' ||
      this.form.nombre == '' ||
      this.form.id == '' ||
      this.form.direccion == '' ||
      this.form.telefono == '' ||
      this.form.contrasena == '') {

    } else {
      this.u.guardar(this.form).subscribe(
        data => {
          Swal.fire({
            type: 'success',
            title: 'Usuario creado correctamente',
            showConfirmButton: false,
            timer: 1500
          });
          this.ngOnInit();
        },
        error => {
          Swal.fire({
            type: 'error',
            title: 'El usuario no puede ser creado,.. Puede causarse al usar un username ya utilizado o un id ya utilizado, o faltan datos,...',
            showConfirmButton: false,
            timer: 1500
          });
        }
      );
    }
  }

  clean() {
    this.form.username = null;
    this.form.nombre = null;
    this.form.id = null;
    this.form.direccion = null;
    this.form.telefono = null;
    this.form.contrasena = null;
    this.form.zona = null;
    this.form.comienzo = null;
    this.form.sede = null;
    this.form.cantidad = null;
  }

  admin(usuario) {
    Swal.fire({
      title: '¿Estas seguro que deseas darle privilegio de administrador a este usuario?',
      text: "",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#89CA8E',
      cancelButtonColor: '#EF4023',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Conceder privilegios!'
    }).then((result) => {
      if (result.value) {
        usuario.tipo = "1";
        this.u.tipo(usuario).subscribe(
          data => {
            Swal.fire({
              type: 'success',
              title: 'El usuario ahora es un administrador',
              showConfirmButton: false,
              timer: 1500
            });
            this.ngOnInit();
          },
          error => {
            Swal.fire({
              type: 'error',
              title: 'No se conceder privilegios, revise su conexión a internet',
              showConfirmButton: false,
              timer: 1500
            });
          }
        );
      }
    })
  }
  regular(usuario) {
    if (localStorage.getItem('usuario') == usuario.username) {
      Swal.fire({
        type: 'error',
        title: 'No te puedes quitar tu mismo los privilegios de administrador, pidele a un colega que te los quite',
        showConfirmButton: false,
        timer: 1500
      });
    } else {
      Swal.fire({
        title: '¿Estas seguro que deseas quitarle privilegio de administrador a este usuario?',
        text: "",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#EF4023',
        cancelButtonColor: '#EF4023',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Quitar privilegios!'
      }).then((result) => {
        if (result.value) {
          usuario.tipo = "0";
          this.u.tipo(usuario).subscribe(
            data => {
              Swal.fire({
                type: 'success',
                title: 'El usuario ya no es un administrador',
                showConfirmButton: false,
                timer: 1500
              });
              this.ngOnInit();
            },
            error => {
              Swal.fire({
                type: 'error',
                title: 'No se pudo quitar los privilegios',
                showConfirmButton: false,
                timer: 1500
              });
            }
          );
        }
      })
    }
  }
  eliminarUsuario(usuario) {
    if (localStorage.getItem('usuario') == usuario.username) {
      Swal.fire({
        type: 'error',
        title: 'No te puedes eliminar tu mismo, esto para asegurar que el sistema simpre cuente con un administrador, pidele a un colega administrador, que te elimine',
        showConfirmButton: false,
        timer: 2500
      });
    } else {
      Swal.fire({
        title: '¿Estas seguro que deseas eliminar este usuario?',
        text: "",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#EF4023',
        cancelButtonColor: '#EF4023',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Eliminar ahora!'
      }).then((result) => {
        if (result.value) {
          usuario.tipo = "0";
          this.u.eliminar(usuario).subscribe(
            data => {
              Swal.fire({
                type: 'success',
                title: 'Eliminado',
                showConfirmButton: false,
                timer: 1500
              });
              this.ngOnInit();
            },
            error => {
              Swal.fire({
                type: 'error',
                title: 'Es posible que este usuario tenga contenido valioso en su cuenta, por ende no puedes eliminarlo',
                showConfirmButton: false,
                timer: 1500
              });
            }
          );
        }
      })
    }
  }
  onSubmitSede() {
    if (this.form.nombre == null || this.form.nombre == '' || this.form.direccion == null || this.form.direccion == '') {
      Swal.fire({
        type: 'error',
        title: 'Faltan datos',
        showConfirmButton: false,
        timer: 1500
      });
    } else {
      this.s.guardar(this.form).subscribe(
        data => {
          Swal.fire({
            type: 'success',
            title: 'Sede creada correctamente',
            showConfirmButton: false,
            timer: 1500
          });
          this.ngOnInit();
        },
        error => {
          Swal.fire({
            type: 'error',
            title: 'La sede no pudo ser creada, revisa tu conexión a internet',
            showConfirmButton: false,
            timer: 1500
          });
        }
      );
    }
  }
  modificarSede(sede){
    if(sede.nombre != null || sede.nombre != '' || sede.direccion != null || sede.direccion != ''){
      this.s.modificar(sede).subscribe(
        data => {
          Swal.fire({
            type: 'success',
            title: 'Sede modificada correctamente',
            showConfirmButton: false,
            timer: 1500
          });
          this.ngOnInit();
        },
        error => {
          Swal.fire({
            type: 'error',
            title: 'La sede no pudo modificar, faltan datos o tu conexion a internet fallo',
            showConfirmButton: false,
            timer: 1500
          });
        }
      );
    }else{
      Swal.fire({
        type: 'error',
        title: 'No puedes mandar espacios en blanco',
        showConfirmButton: false,
        timer: 1500
      });
    }
  }
  eliminarSede(sede){
      Swal.fire({
        title: '¿Estas seguro que deseas eliminar esta sede?',
        text: "",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#EF4023',
        cancelButtonColor: '#EF4023',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Eliminar ahora!'
      }).then((result) => {
        if (result.value) {
          this.s.eliminar(sede).subscribe(
            data => {
              Swal.fire({
                type: 'success',
                title: 'Eliminada',
                showConfirmButton: false,
                timer: 1500
              });
              this.ngOnInit();
            },
            error => {
              Swal.fire({
                type: 'error',
                title: 'Es posible que no se pueda eliminar, porque esta sede esta asociada a otros componentes, como parqueos o espacios,..',
                showConfirmButton: false,
                timer: 1500
              });
            }
          );
        }
      })
  }
  onSubmitParqueo(){
      this.p.guardar(this.form).subscribe(
        data => {
          Swal.fire({
            type: 'success',
            title: 'Parqueo creado correctamente',
            showConfirmButton: false,
            timer: 1500
          });
          this.ngOnInit();
        },
        error => {
          Swal.fire({
            type: 'error',
            title: 'La sede no pudo ser creada, faltatan datos, o tienes problemas en tu conexión de internet',
            showConfirmButton: false,
            timer: 2500
          });
        }
      );
    }
    modificarParqueo(parqueo){
        parqueo.sede = parqueo.id_sede;
        this.p.modificar(parqueo).subscribe(
          data => {
            Swal.fire({
              type: 'success',
              title: 'Parqueo modificado correctamente',
              showConfirmButton: false,
              timer: 1500
            });
            this.ngOnInit();
          },
          error => {
            Swal.fire({
              type: 'error',
              title: 'El parqueo no se pudo modificar, faltan datos o tu conexion a internet fallo',
              showConfirmButton: false,
              timer: 1500
            });
          }
        );
    }
    eliminarParqueo(parqueo){
      Swal.fire({
        title: '¿Estas seguro que deseas eliminar este parqueo?',
        text: "",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#EF4023',
        cancelButtonColor: '#EF4023',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Eliminar ahora!'
      }).then((result) => {
        if (result.value) {
          this.s.eliminar(parqueo).subscribe(
            data => {
              Swal.fire({
                type: 'success',
                title: 'Eliminado',
                showConfirmButton: false,
                timer: 1500
              });
              this.ngOnInit();
            },
            error => {
              Swal.fire({
                type: 'error',
                title: 'Es posible que no se pueda eliminar, porque esta sede esta asociada a otros componentes, como espacios,..',
                showConfirmButton: false,
                timer: 2500
              });
            }
          );
        }
      })
    }
    verEspacios(parqueo){
      console.log(parqueo);
    }
}
