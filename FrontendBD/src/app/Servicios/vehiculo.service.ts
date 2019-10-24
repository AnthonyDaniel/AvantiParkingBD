import { Injectable } from '@angular/core';
import { HttpClient } from 'selenium-webdriver/http';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  private baseUrl = 'http://localhost:8000/api/vehiculo';

  constructor(private http: HttpClient) { }

  public listarVehiculo() {
    
  }

}
