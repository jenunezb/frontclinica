import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './pagina/inicio/inicio.component';
import { LoginComponent } from './pagina/login/login.component';
import { AlertaComponent } from './pagina/alerta/alerta.component';
import { RegistroPacienteComponent } from './pagina/registro-paciente/registro-paciente.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    LoginComponent,
    AlertaComponent,
    RegistroPacienteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
