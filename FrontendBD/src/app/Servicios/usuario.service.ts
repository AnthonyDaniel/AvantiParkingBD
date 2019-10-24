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

}
