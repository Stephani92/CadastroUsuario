import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventosComponent } from './eventos/Eventos.component';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './user/login/login.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { AuthGuard } from './auth/auth.guard';
import { PalestrantesComponent } from './palestrantes/palestrantes.component';
import { EventoEditComponent } from './eventos/eventoEdit/eventoEdit.component';


const routes: Routes = [
  {path: 'user', component: UserComponent,
    children: [
      {path: 'login', component: LoginComponent},
      {path: 'registration', component: RegistrationComponent}
  ]},
  {path: 'eventos', component: EventosComponent, canActivate: [AuthGuard]},
  {path: 'evento/:id/edit', component: EventoEditComponent, canActivate: [AuthGuard]},
  {path: 'home', component: PalestrantesComponent, canActivate: [AuthGuard]},
  {path: '', component: AppComponent},
  {path: '**', component: AppComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
