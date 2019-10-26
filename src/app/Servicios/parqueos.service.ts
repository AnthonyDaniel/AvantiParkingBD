import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParqueosService {
  private baseUrl = 'https://avantiparking.azurewebsites.net/api/parqueo';

  constructor(private http: HttpClient) { }

  public obtenerParqueo() {
    return this.http.get(`${this.baseUrl}`)
  }
  public modificar(data){
    return this.http.put(`${this.baseUrl}/${data.id_parqueo}`,data)
  }
  public eliminar(data){
    return this.http.delete(`${this.baseUrl}/${data.id_parqueo}`)
  }
  public guardar(data){
    return this.http.post(`${this.baseUrl}`,data)
  }
}