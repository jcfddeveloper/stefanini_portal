import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';

import { HomeComponent } from './pages/home/home.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';
import { PersonaComponent } from './pages/persona/persona.component';
import { PersonaViewComponent } from './pages/persona/persona-view/persona-view.component';
import { PersonaEditComponent } from './pages/persona/persona-edit/persona-edit.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'registro', component: RegistroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'persona', component: PersonaComponent, canActivate: [AuthGuard] },
  { path: 'persona/view/:codigo', component: PersonaViewComponent, canActivate: [AuthGuard] },
  { path: 'persona/edit/:codigo', component: PersonaEditComponent, canActivate: [AuthGuard] },
  { path: 'persona', component: PersonaComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
