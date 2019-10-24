import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Servicios/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private auth: AuthService) { }

  navbarOpen = false;
  public loggedIn : boolean;
  public admin : boolean;

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
  ngOnInit() {
    if(localStorage.getItem('tipo') == '1'){
      this.auth.changeAdminStatus(true);
    }else{
      this.auth.changeAdminStatus(false);
    }
    if(localStorage.getItem('usuario') == null || localStorage.getItem('usuario') == ''){
      this.auth.changeAuthStatus(false);
    }else{
      this.auth.changeAuthStatus(true);
    }

    this.auth.authStatus.subscribe(value=> this.loggedIn = value);
    this.auth.adminStatus.subscribe(value=> this.admin = value);
  }
  logout(){
    localStorage.setItem("usuario","");
    localStorage.setItem("tipo","0");
    this.auth.changeAdminStatus(false);
    this.auth.changeAuthStatus(false);
  }
}
