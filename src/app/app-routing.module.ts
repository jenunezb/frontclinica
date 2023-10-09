import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './pagina/inicio/inicio.component';
import { LoginComponent } from './pagina/login/login.component';
import { RegistroMedicoComponent } from './pagina/registro-medico/registro-medico.component';
import { HorarioComponent } from './pagina/horario/horario.component';
const routes: Routes = [
{ path: "", component: InicioComponent },
{ path: "login", component: LoginComponent },
{ path: "registro", component: RegistroMedicoComponent },
{path: "horario", component: HorarioComponent},
{ path: "**", pathMatch: "full", redirectTo: "" }
];
@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
