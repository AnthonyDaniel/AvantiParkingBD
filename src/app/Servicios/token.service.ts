import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  loggedIn() {
    if(localStorage.getItem('usuario') == null || localStorage.getItem('usuario') == ''){
      return false;
    }
    else{
      return true;
    }
  }

  admin(){
    if(localStorage.getItem('tipo') == '1'){
      return true;
    }
    else{
      return false;
    }
  }

}
