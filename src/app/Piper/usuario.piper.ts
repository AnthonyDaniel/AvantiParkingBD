import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'usuarioPiper'
})
export class UsuarioPiper implements PipeTransform {
  transform(value: any, arg: any): any {
    if (arg === '' || arg.length < 1) return value;
    const usuario = [];
    for (const u of value) {
      if (u.id.toLowerCase().indexOf(arg.toLowerCase()) > -1 || u.username.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||  u.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        usuario.push(u);
      };
    };
    return usuario;
  }
}