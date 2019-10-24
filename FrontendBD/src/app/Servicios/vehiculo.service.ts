import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  private baseUrl = 'http://127.0.0.1:8000/api/vehiculo';

  constructor(private http: HttpClient) { }

  public listarVehiculo(){
    this.http.get(`${this.baseUrl}`);
  }
  public guardarVehiculo(data){
    this.http.post(`${this.baseUrl}/vehiculo`, data);
  }

}
