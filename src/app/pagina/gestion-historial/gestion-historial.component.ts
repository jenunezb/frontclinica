import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ItemCitaAdminDTO } from 'src/app/modelo/item-cita-admin-dto';
import { AdministradorService } from 'src/app/servicios/administrador.service';
import { UsuarioService } from 'src/app/servicios/paciente.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-gestion-historial',
  templateUrl: './gestion-historial.component.html',
  styleUrls: ['./gestion-historial.component.css']
})
export class GestionHistorialComponent {
  public listaCitas: ItemCitaAdminDTO[] = [];
  esAdmin: boolean = false;
  cita: number=0;

  constructor(private administardorService: AdministradorService, private router : Router,private tokenService: TokenService,
    private pacienteService: UsuarioService){
      this.cita=0;
    }

    ngOnInit(): void {
      this.listarCitas();
      if(this.tokenService.getRole()[0]=="m"){
        this.esAdmin=true;
      }
    }
  
    public listarCitas(): void{
      if(this.tokenService.getRole()[0]=="m"){
        this.administardorService.listarCitas().subscribe(
          (response: any) => {
            console.log('Respuesta del servicio:', response.respuesta);
            this.listaCitas = response.respuesta;
        },
        error => {
          console.error('Error al obtener la lista de citas', error);
        }
        );
      }
      this.pacienteService.historialMedico(this.tokenService.getCodigo()).subscribe(
        (response: any) => {
          console.log('Respuesta del servicio:', response.respuesta);
          this.listaCitas = response.respuesta;
          console.log(this.listaCitas);
      },
      error => {
        console.error('Error al obtener la lista de citas', error);
      }
      );
}

verDetalleCita(cita: number){
  this.router.navigate(['/historia-clinica']);
}
}