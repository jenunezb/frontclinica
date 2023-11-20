import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './pagina/generalidades/inicio/inicio.component';
import { LoginComponent } from './pagina/generalidades/login/login.component';
import { RegistroPacienteComponent } from './pagina/generalidades/registro-paciente/registro-paciente.component';
import { GestionPqrsComponent } from './pagina/paciente/gestion-pqrs/gestion-pqrs.component';
import { CrearPqrsComponent } from './pagina/paciente/crear-pqrs/crear-pqrs.component';
import { DetallePqrsComponent } from './pagina/paciente/detalle-pqrs/detalle-pqrs.component';
import { LoginGuard } from './guards/permiso.service';
import { RolesGuard }from './guards/roles.service';
import { AtencionCitaComponentComponent } from './pagina/medico/atencion-cita-component/atencion-cita-component.component';
import { CrearMedicoComponentComponent } from './pagina/administrador/crear-medico-component/crear-medico-component.component';
import { GestionMedicoComponentComponent } from './pagina/administrador/gestion-medico-component/gestion-medico-component.component';
import { GestionPacienteComponentComponent } from './pagina/paciente/gestion-paciente-component/gestion-paciente-component.component';
import { EditarMedicoComponent } from './pagina/administrador/editar-medico/editar-medico.component';
import { CrearCitaComponent } from './pagina/paciente/crear-cita/crear-cita.component';
import { ListarCitasComponent } from './pagina/listar-citas/listar-citas.component';
import { GestionHistorialComponent } from './pagina/gestion-historial/gestion-historial.component';

const routes: Routes = [
{ path: "", component: InicioComponent },
{ path: "login", component: LoginComponent },
{ path: "registro-paciente", component: RegistroPacienteComponent},
{ path: "gestion-pqrs", component: GestionPqrsComponent },
{ path: "crear-pqrs", component: CrearPqrsComponent },
{ path: "detalle-pqrs/:codigo", component: DetallePqrsComponent },
{ path: "login", component: LoginComponent, canActivate: [LoginGuard] },
{ path: "registro", component: RegistroPacienteComponent, canActivate: [LoginGuard] },
{ path: "gestion-pqrs", component: GestionPqrsComponent, canActivate: [RolesGuard], data: {expectedRole: ["paciente", "admin"] } },
{ path: "crear-pqrs", component: CrearPqrsComponent, canActivate: [RolesGuard], data: { expectedRole: ["paciente"] } },
{ path: "detalle-pqrs/:codigo", component: DetallePqrsComponent, canActivate: [RolesGuard], data: { expectedRole: ["paciente", "admin"] } },
{ path: "atender-cita", component: AtencionCitaComponentComponent, canActivate: [RolesGuard], data: { expectedRole: ["medico"] } },
{ path: "crear-medico", component: CrearMedicoComponentComponent, canActivate: [RolesGuard], data: { expectedRole: ["admin"] } },
{ path: "gestion-medico", component: GestionMedicoComponentComponent, canActivate: [RolesGuard], data: { expectedRole: ["admin"] } },
{ path: "editar-medico/:codigo", component: EditarMedicoComponent, canActivate: [RolesGuard], data: { expectedRole: ["admin"] } },
{ path: "gestion-paciente", component: GestionPacienteComponentComponent, canActivate: [RolesGuard], data: {expectedRole: ["paciente"] } },
{ path: "crear-cita", component: CrearCitaComponent, canActivate: [RolesGuard], data: {expectedRole: ["paciente"] } },
{ path: "lista-citas", component: ListarCitasComponent, canActivate: [RolesGuard], data: {expectedRole: ["paciente", "admin"]  } },
{ path: "gestion-historial", component: GestionHistorialComponent, canActivate: [RolesGuard], data: {expectedRole: ["paciente", "medico"]  } },

{ path: "**", pathMatch: "full", redirectTo: "" }
];
@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
