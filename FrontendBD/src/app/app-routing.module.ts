import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Componentes/login/login.component';
import { RegistrarComponent } from './Componentes/registrar/registrar.component';
import { PerfilComponent } from './Componentes/perfil/perfil.component';
import { BeforeLoginService } from './Servicios/before-login.service';
import { AfterLoginService } from './Servicios/after-login.service';
const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'registrar', component: RegistrarComponent},
  { path: 'perfil', component: PerfilComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
