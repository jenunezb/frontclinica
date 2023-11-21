import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ItemCitaAdminDTO } from 'src/app/modelo/item-cita-admin-dto';
import { AdministradorService } from 'src/app/servicios/administrador.service';
import { UsuarioService } from 'src/app/servicios/paciente.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-historia-clinica',
  templateUrl: './historia-clinica.component.html',
  styleUrls: ['./historia-clinica.component.css']
})
export class HistoriaClinicaComponent {
  esMedico: boolean = false;
  public listaCitas: ItemCitaAdminDTO[] = [];
  cita: number=0;
  constructor(private administardorService: AdministradorService, private router : Router,private tokenService: TokenService,
    private pacienteService: UsuarioService){
      this.cita=0;
    }

    ngOnInit(): void {
      this.listarCitas();
      if(this.tokenService.getRole()[0]=="m"){
        this.esMedico=true;
      }
    }
    
  public listarCitas(): void{
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
public traerPaciente(): void{
this.pacienteService.obtenerPaciente(this.tokenService.getCodigo()).subscribe(
  (response: any) => {
    console.log('Respuesta del servicio:', response.respuesta);
    this.listaCitas = response.respuesta;
},
error => {
  console.error('Error al obtener la lista de citas', error);
}
);

}

}
