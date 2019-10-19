import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
 
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {

  }

  registrarUsuarios(data: any) {
    return this.http.post(`${this.baseUrl}/usuario`, data)
  }
  obtenerUsuarios() {
    return this.http.get(`${this.baseUrl}/usuario`)
  }
  eliminarUsuario(data){
    return this.http.delete(`${this.baseUrl}/usuario/${data}`)
  }
  modificarUsuario(data){
    return this.http.put(`${this.baseUrl}/usuario/${data.ID}`, data)
  }
  registerSede(data){
    return this.http.post(`${this.baseUrl}/sede`, data)
  }
  getSede(){
    return this.http.get(`${this.baseUrl}/sede`)
  }
  modifySede(data){
    return this.http.post(`${this.baseUrl}/sede`, data)
  }
  deleteSede(data){
    return this.http.post(`${this.baseUrl}/sede`, data)
  }
  registerParking(data){
    return this.http.post(`${this.baseUrl}/parqueo`, data)
  }
  getParqueo(){
    return this.http.get(`${this.baseUrl}/parqueo`)
  }
  deleteParking(data){
    return this.http.post(`${this.baseUrl}/parqueo`, data)
  }
  modifyParking(data){
    return this.http.post(`${this.baseUrl}/parqueo`, data)
  } 
  getSpace(data){
    return this.http.post(`${this.baseUrl}/espacio`, data)
  } 
  modifySpace(data){
    return this.http.post(`${this.baseUrl}/espacio`, data)
  }
  deleteSpace(data){
    return this.http.post(`${this.baseUrl}/espacio`, data)
  }
  //-----------------------------
  addReserve(data){
    return this.http.post(`${this.baseUrl}/reserva`, data)
  }
  listReserve(data){
    return this.http.post(`${this.baseUrl}/reserva`, data)
  }
  deleteReserve(data){
    return this.http.post(`${this.baseUrl}/reserva`, data)
  }

}
