import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EspaciosService {
  private baseUrl = 'https://avantiparking.azurewebsites.net/api/espacio';

  constructor(private http: HttpClient) { }

  public obtenerEspacios(data) {
    return this.http.get(`${this.baseUrl}_parqueo_tipo_disponibilidad/${data.parqueo}/${data.tipo_espacio}/${data.estado}`)
  }
  public modificar(data){
    return this.http.put(`${this.baseUrl}/${data.id_espacio}`,data)
  }
  public eliminar(data){
    return this.http.delete(`${this.baseUrl}/${data.id_espacio}`)
  }
  public guardar(data){
    return this.http.post(`${this.baseUrl}`,data)
  }
}