import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventosComponent } from './eventos/Eventos.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './user/login/login.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { NavComponent } from './nav/nav.component';
import { PalestrantesComponent } from './palestrantes/palestrantes.component';


import { DateTimeFormatPipePipe } from './_helps/DateTimeFormatPipe.pipe';
import { ModalModule, TooltipModule, BsDropdownModule, BsDatepickerModule } from 'ngx-bootstrap';




@NgModule({
   declarations: [
      AppComponent,
      EventosComponent,
      UserComponent,
      RegistrationComponent,
      LoginComponent,
      NavComponent,
      PalestrantesComponent,
      DateTimeFormatPipePipe
   ],
   imports: [
      BrowserModule,
      BsDropdownModule.forRoot(),
      BsDatepickerModule.forRoot(),
      TooltipModule.forRoot(),
      ModalModule.forRoot(),
      ToastrModule.forRoot({
         timeOut: 3000,
         preventDuplicates: true,
         progressBar: true
      }),
      BrowserAnimationsModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
