import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './pagina/generalidades/inicio/inicio.component';
import { LoginComponent } from './pagina/generalidades/login/login.component';
import { AlertaComponent } from './pagina/generalidades/alerta/alerta.component';
import { RegistroPacienteComponent } from './pagina/generalidades/registro-paciente/registro-paciente.component';
import { GestionPqrsComponent } from './pagina/paciente/gestion-pqrs/gestion-pqrs.component';
import { CrearPqrsComponent } from './pagina/paciente/crear-pqrs/crear-pqrs.component';
import { DetallePqrsComponent } from './pagina/paciente/detalle-pqrs/detalle-pqrs.component';
import { AtencionCitaComponentComponent } from './pagina/medico/atencion-cita-component/atencion-cita-component.component';
import { CrearMedicoComponentComponent } from './pagina/administrador/crear-medico-component/crear-medico-component.component';
import { UsuarioInterceptor } from './interceptor/usuario.interceptor';
import { GestionMedicoComponentComponent } from './pagina/administrador/gestion-medico-component/gestion-medico-component.component';
import { GestionPacienteComponentComponent } from './pagina/paciente/gestion-paciente-component/gestion-paciente-component.component';
import { EditarMedicoComponent } from './pagina/administrador/editar-medico/editar-medico.component';
import { CrearCitaComponent } from './pagina/paciente/crear-cita/crear-cita.component';
import { ListarCitasComponent } from './pagina/listar-citas/listar-citas.component';
import { GestionHistorialComponent } from './pagina/gestion-historial/gestion-historial.component';
import { HistoriaClinicaComponent } from './pagina/historia-clinica/historia-clinica.component';
import { ListarCitasPendientesComponent } from './pagina/medico/listar-citas-pendientes/listar-citas-pendientes.component';
import { AtenderCitaComponent } from './pagina/medico/atender-cita/atender-cita.component';
import { AgendarDiaLibreComponent } from './pagina/medico/agendar-dia-libre/agendar-dia-libre.component';
import { ListarCitasRealizadasComponent } from './pagina/medico/listar-citas-realizadas/listar-citas-realizadas.component';

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
    GestionMedicoComponentComponent,
    GestionPacienteComponentComponent,
    EditarMedicoComponent,
    CrearCitaComponent,
    ListarCitasComponent,
    GestionHistorialComponent,
    HistoriaClinicaComponent,
    ListarCitasPendientesComponent,
    AtenderCitaComponent,
    AgendarDiaLibreComponent,
    ListarCitasRealizadasComponent

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
