import { Component } from '@angular/core';
import { RegistroPQRSDTO } from 'src/app/modelo/registro-pqrsdto';
import { PqrsService } from 'src/app/servicios/pqrs.service';
import { ListarCitasComponent } from '../../listar-citas/listar-citas.component';
import { ItemCitaAdminDTO } from 'src/app/modelo/item-cita-admin-dto';
import { UsuarioService } from 'src/app/servicios/paciente.service';
import { TokenService } from 'src/app/servicios/token.service';
@Component({
selector: 'app-crear-pqrs',
templateUrl: './crear-pqrs.component.html',
styleUrls: ['./crear-pqrs.component.css']
})
export class CrearPqrsComponent {
public listaCitas: ItemCitaAdminDTO[] = [];
registroPQRSDTO: RegistroPQRSDTO;

constructor(private pqrsService: PqrsService, private pacienteService: UsuarioService, private tokenService: TokenService) {
this.registroPQRSDTO = new RegistroPQRSDTO();
}

ngOnInit(): void {
  this.listarCitas();
}

public crearPqrs(){
  this.pacienteService.crearPQRS(this.registroPQRSDTO).subscribe({
    next: data => {
      alert(JSON.stringify(data.respuesta));
      },
      error: error => {
          alert( "Error: " + error.error.respuesta);
      }
      });
  
}


public seleccionar(codigoCita:number){
this.registroPQRSDTO.codigoCita = codigoCita;
}

public listarCitas(){
    this.pacienteService.listarCitas(this.tokenService.getCodigo()).subscribe(
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

