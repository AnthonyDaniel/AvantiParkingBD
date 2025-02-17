import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  private baseUrl = 'https://avantiparking.azurewebsites.net/api/vehiculo';

  constructor(private http: HttpClient) { }
  public  listarVehiculo() {
    return this.http.get(`${this.baseUrl}`)
  }
  public guardarVehiculo(data){
    return this.http.post(`${this.baseUrl}`,data)
  }
  public modificarVehiculo(data){
    return this.http.put(`${this.baseUrl}/${data.placa}`,data)
  }
  public eliminarVehiculo(data){
    return this.http.delete(`${this.baseUrl}/${data.placa}`)
  }
}
