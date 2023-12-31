import { Component } from '@angular/core';
import { ItemMedicoDTO } from 'src/app/modelo/item-medico.dto';
import { AdministradorService } from 'src/app/servicios/administrador.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestion-medico-component',
  templateUrl: './gestion-medico-component.component.html',
  styleUrls: ['./gestion-medico-component.component.css']
})
export class GestionMedicoComponentComponent {
  public listaMedicos: ItemMedicoDTO[] = [];

  constructor(private administradorService: AdministradorService, private router:Router) {}

  ngOnInit(): void {
    this.listarMedicos();
  }

  public listarMedicos(): void {
    this.administradorService.listarMedicos().subscribe(
      (response: any) => {
          console.log('Respuesta del servicio:', response.respuesta);
          this.listaMedicos = response.respuesta;
      },
      error => {
        console.error('Error al obtener la lista de médicos', error);
      }
    );
  }

  public editarMedico(medico: ItemMedicoDTO): void {
    console.log('Editar médico:', medico.codigo);
    this.router.navigate(['/editar-medico/'+medico.codigo]);
  }

  public eliminarMedico(medico: ItemMedicoDTO): void {
    // Llama al servicio para eliminar el médico
    this.administradorService.eliminarMedico(medico.codigo).subscribe(
      (response: any) => {
        alert('Médico eliminado');
        this.listarMedicos();
      },
      error => {
        console.error('Error al eliminar médico', error);
        // Muestra una alerta de error si es
        alert('Error al eliminar médico');
        this.listarMedicos();
      }
    );
  }
}
