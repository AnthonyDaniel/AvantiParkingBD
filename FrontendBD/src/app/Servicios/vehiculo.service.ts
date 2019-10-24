import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  private baseUrl = 'http://localhost:8000/api/vehiculo';

  constructor() { }

}
