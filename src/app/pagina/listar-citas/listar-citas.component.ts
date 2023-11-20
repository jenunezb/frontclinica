import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ItemCitaAdminDTO } from 'src/app/modelo/item-cita-admin-dto';
import { AdministradorService } from 'src/app/servicios/administrador.service';
import { UsuarioService } from 'src/app/servicios/paciente.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-listar-citas',
  templateUrl: './listar-citas.component.html',
  styleUrls: ['./listar-citas.component.css']
})
export class ListarCitasComponent {
  public listaCitas: ItemCitaAdminDTO[] = [];
  esAdmin: boolean = false;

  constructor(private administardorService: AdministradorService, private router : Router,private tokenService: TokenService,
    private pacienteService: UsuarioService){}

  ngOnInit(): void {
    this.listarCitas();
    if(this.tokenService.getRole()[0]=="a"){
      this.esAdmin=true;
    }
  }

  public listarCitas(): void{
    if(this.tokenService.getRole()[0]=="a"){
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

  public editarCita(){

  }
}
