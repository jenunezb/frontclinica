import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ItemPQRSDTO } from 'src/app/modelo/item-pqrsdto';
import { UsuarioService } from 'src/app/servicios/paciente.service';
import { TokenService } from 'src/app/servicios/token.service';
@Component({
selector: 'app-gestion-pqrs',
templateUrl: './gestion-pqrs.component.html',
styleUrls: ['./gestion-pqrs.component.css']
})
export class GestionPqrsComponent {
pqrs: ItemPQRSDTO[];
constructor(private pacienteService: UsuarioService, private tokenService: TokenService, private router: Router) {
  this.pqrs = [];
  this.obtenerPqrs();
  }
  public obtenerPqrs() {
  let codigo = this.tokenService.getCodigo();
  this.pacienteService.listarPQRSPaciente(codigo).subscribe({
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