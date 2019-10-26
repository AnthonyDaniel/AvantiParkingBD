import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SedesService {
  private baseUrl = 'https://avantiparking.azurewebsites.net/api/sede';

  constructor(private http: HttpClient) { }

  public obtenerSedes() {
    return this.http.get(`${this.baseUrl}`)
  }
  public modificar(data){

    return this.http.put(`${this.baseUrl}/${data.id_sede}`,data)
  }
  public eliminar(data){
    return this.http.delete(`${this.baseUrl}/${data.id_sede}`)
  }
  public guardar(data){
    return this.http.post(`${this.baseUrl}`,data)
  }

}
