import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EstadoPQRS } from 'src/app/modelo/estado-pqrs';
import { ItemPQRSDTO } from 'src/app/modelo/item-pqrsdto';
import { AdministradorService } from 'src/app/servicios/administrador.service';
import { UsuarioService } from 'src/app/servicios/paciente.service';
import { TokenService } from 'src/app/servicios/token.service';
@Component({
selector: 'app-gestion-pqrs',
templateUrl: './gestion-pqrs.component.html',
styleUrls: ['./gestion-pqrs.component.css']
})
export class GestionPqrsComponent {
pqrs: ItemPQRSDTO[];
estado: EstadoPQRS;

constructor(private pacienteService: UsuarioService, private tokenService: TokenService, private router: Router, private administradorService: AdministradorService) {
  this.pqrs = [];
  this.obtenerPqrs();
  this.estado = new EstadoPQRS();
  }

  public obtenerPqrs() {
  let codigo = this.tokenService.getCodigo();
  if (this.tokenService.getRole()[0] === "p") {
    this.pacienteService.listarPQRSPaciente(codigo).subscribe({
      next: data => {
      this.pqrs = data.respuesta;
      console.log(data);
      },
      error: error => {
        if (error.status === 403) {
          // Redirigir a la página de inicio de sesión u otra página no autorizada
          this.router.navigate(['/login']);
        } else {
          console.log(error);
        }
      }
      });
  }
  else{
    this.administradorService.listarPQRS().subscribe({
next: data => {
  this.pqrs = data.respuesta;
},
error: error => {
  if (error.status === 403) {
    // Redirigir a la página de inicio de sesión u otra página no autorizada
    this.router.navigate(['/login']);
  } else {
    console.log(error);
  }
}
    });
  }
 
  }
  public cambiarEstado(codigo:number, estador:string){
    if (codigo) {
      // Lógica para cambiar el estado
      console.log('Cambiando estado para el código:', codigo);
  } else {
      console.error('El código no está definido.');
  }
this.estado.codigoPQRS=codigo;
this.estado.estadoPQRS=estador;

console.log(this.estado);

    if (this.tokenService.getRole()[0] === "a") {
      this.administradorService.cambiarEstadoPQRS(this.estado).subscribe({
        next: data => {
        console.log(data.respuesta);
        },
        error: error => {
            console.log(error);
        }
        });
    }
  }
  }