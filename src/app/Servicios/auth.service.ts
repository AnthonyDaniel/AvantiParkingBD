import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TokenService } from './token.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.token.loggedIn());
  authStatus = this.loggedIn.asObservable();

  private admin = new BehaviorSubject<boolean>(this.token.admin());
  adminStatus = this.admin.asObservable();

  changeAuthStatus(value:boolean) {
    this.loggedIn.next(value)
  }

  changeAdminStatus(value:boolean) {
    this.admin.next(value)
  }

  constructor(private token: TokenService) { }

}