import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './pagina/inicio/inicio.component';
import { LoginComponent } from './pagina/login/login.component';
import { RegistroPacienteComponent } from './pagina/registro-paciente/registro-paciente.component';


const routes: Routes = [
{ path: "", component: InicioComponent },
{ path: "login", component: LoginComponent },
{ path: "registro-paciente", component: RegistroPacienteComponent},
{ path: "**", pathMatch: "full", redirectTo: "" }
];
@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
