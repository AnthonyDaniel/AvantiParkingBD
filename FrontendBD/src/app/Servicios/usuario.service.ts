import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private baseUrl = 'http://localhost:8000/api/usuario';

  constructor(private http: HttpClient) { }

  public obtenerUsuarios() {
    return this.http.get(`${this.baseUrl}`)
  }
  public modificarUsuario(data){
    return this.http.put(`${this.baseUrl}/${data.id}`,data)
  }
  public eliminar(data){
    return this.http.delete(`${this.baseUrl}/${data.id}`)
  }
}
