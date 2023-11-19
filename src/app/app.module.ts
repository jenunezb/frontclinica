import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './pagina/inicio/inicio.component';
import { LoginComponent } from './pagina/login/login.component';
import { AlertaComponent } from './pagina/alerta/alerta.component';
import { RegistroPacienteComponent } from './pagina/registro-paciente/registro-paciente.component';
import { GestionPqrsComponent } from './pagina/gestion-pqrs/gestion-pqrs.component';
import { CrearPqrsComponent } from './pagina/crear-pqrs/crear-pqrs.component';
import { DetallePqrsComponent } from './pagina/detalle-pqrs/detalle-pqrs.component';
import { AtencionCitaComponentComponent } from './pagina/atencion-cita-component/atencion-cita-component.component';
import { CrearMedicoComponentComponent } from './pagina/crear-medico-component/crear-medico-component.component';
import { UsuarioInterceptor } from './interceptor/usuario.interceptor';
import { GestionMedicoComponentComponent } from './pagina/gestion-medico-component/gestion-medico-component.component';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    LoginComponent,
    AlertaComponent,
    RegistroPacienteComponent,
    GestionPqrsComponent,
    CrearPqrsComponent,
    DetallePqrsComponent,
    AtencionCitaComponentComponent,
    CrearMedicoComponentComponent,
    GestionMedicoComponentComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: UsuarioInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
