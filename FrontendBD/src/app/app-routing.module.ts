import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Componentes/login/login.component';
import { RegistrarComponent } from './Componentes/registrar/registrar.component';
import { PerfilComponent } from './Componentes/perfil/perfil.component';
import { BeforeLoginService } from './Servicios/before-login.service';
import { AfterLoginService } from './Servicios/after-login.service';
const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [BeforeLoginService]},
  { path: 'registrar', component: RegistrarComponent,canActivate: [BeforeLoginService]},
  { path: 'perfil', component: PerfilComponent ,canActivate: [AfterLoginService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
