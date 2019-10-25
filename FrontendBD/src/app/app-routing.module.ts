import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Componentes/login/login.component';
import { RegistrarComponent } from './Componentes/registrar/registrar.component';
import { PerfilComponent } from './Componentes/perfil/perfil.component';
import { VehiculoComponent } from './Componentes/vehiculo/vehiculo.component';
import { ReservaComponent } from './Componentes/reserva/reserva.component';
import { BeforeLoginService } from './Servicios/before-login.service';
import { AfterLoginService } from './Servicios/after-login.service';
import { AdministradorComponent } from './Componentes/administrador/administrador.component';
import { AdminLoginService } from './Servicios/admin-login.service';
const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [BeforeLoginService]},
  { path: 'registrar', component: RegistrarComponent,canActivate: [BeforeLoginService]},
  { path: 'vehiculo', component: VehiculoComponent ,canActivate: [BeforeLoginService]},
  { path: 'reserva', component: ReservaComponent, canActivate: [BeforeLoginService]},
  { path: 'perfil', component: PerfilComponent ,canActivate: [AfterLoginService]},
  { path: 'admin', component: AdministradorComponent, canActivate: [AdminLoginService]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
