import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventosComponent } from './eventos/Eventos.component';
import { AppComponent } from './app.component';


const routes: Routes = [
  {path: 'evento', component: EventosComponent},
  {path: 'home', component: AppComponent},
  {path: '', component: AppComponent},
  {path: '**', component: AppComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
