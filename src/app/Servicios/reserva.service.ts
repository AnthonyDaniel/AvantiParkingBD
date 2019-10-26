import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private baseUrl = 'https://avantiparking.azurewebsites.net/api/reserva';

  constructor(private http: HttpClient) { }
  public  listarReservas() {
    return this.http.get(`${this.baseUrl}`)
  }
  public guardarReserva(data){
    return this.http.post(`${this.baseUrl}`,data)
  }
  public eliminarReserva(data){
    return this.http.delete(`${this.baseUrl}/${data.id_reserva}`)
  }
}
