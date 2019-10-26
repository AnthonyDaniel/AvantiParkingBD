import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Componentes/navbar/navbar.component';
import { FooterComponent } from './Componentes/footer/footer.component';
import { LoginComponent } from './Componentes/login/login.component';
import { RegistrarComponent } from './Componentes/registrar/registrar.component';
import { PerfilComponent } from './Componentes/perfil/perfil.component';
import { HttpClientModule } from '@angular/common/http';
import { VehiculoComponent } from './Componentes/vehiculo/vehiculo.component';
import { AdministradorComponent } from './Componentes/administrador/administrador.component';
import { ReservaComponent } from './Componentes/reserva/reserva.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioPiper } from './Piper/usuario.piper';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    RegistrarComponent,
    PerfilComponent,
    VehiculoComponent,
    AdministradorComponent,
    ReservaComponent,
    UsuarioPiper
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
