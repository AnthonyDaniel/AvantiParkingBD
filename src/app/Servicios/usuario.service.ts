import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private baseUrl = 'https://avantiparking.azurewebsites.net/api/usuario';

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
  public guardar(data){
    return this.http.post(`${this.baseUrl}`,data)
  }
  public tipo(data){
    return this.http.put(`${this.baseUrl}tipo/${data.id}`,data)
  }
}
