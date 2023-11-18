import { Component } from '@angular/core';
import { Alerta } from 'src/app/modelo/alerta';
import { ClinicaService } from 'src/app/servicios/clinica.service';
import { RegistroPacienteDTO } from 'src/app/modelo/registro-paciente-dto';
import { UsuarioService } from 'src/app/servicios/paciente.service';

@Component({
  selector: 'app-registro-paciente',
  templateUrl: './registro-paciente.component.html',
  styleUrls: ['./registro-paciente.component.css']
})

export class RegistroPacienteComponent {

  alerta!: Alerta;
  ciudades: string[] = [];
  eps: string[] = [];
  archivos!:FileList;
  tipoSangre: string[]= [];
  registroPacienteDTO: RegistroPacienteDTO;
  selectedCiudad: string = ""; // Nueva propiedad para manejar la selección

  constructor(private clinicaService: ClinicaService, pacienteService: UsuarioService) {
    this.registroPacienteDTO = new RegistroPacienteDTO();
    this.cargarCiudades();
    this.cargarEps();
    this.cargarTipoSangre();
  }

  private cargarCiudades() {
    this.clinicaService.listarCiudades().subscribe({
      next: data => {
        this.ciudades = data.respuesta;
      },
      error: error => {
        console.log(error);
      }
    });
  }

  private cargarEps(){
    this.clinicaService.listarEPS().subscribe({
      next: data => {
        this.eps = data.respuesta;
      },
      error: error => {
        console.log(error);
      }
    });
  }

  private cargarTipoSangre(){
    this.clinicaService.listarTipoSangre().subscribe({
      next: data => {
        this.tipoSangre = data.respuesta;
      },
      error: error => {
        console.log(error);
      }
    });
  }

  public registrar(){
    if(this.archivos != null && this.archivos.length > 0){
    console.log(this.registroPacienteDTO);
    }else{
    console.log("Debe cargar una foto");
    }
    }

  public sonIguales():boolean{
      return this.registroPacienteDTO.password == this.registroPacienteDTO.confirmaPassword;
      }
      public onFileChange(event:any){
        this.archivos = event.target.files;
        if (event.target.files.length > 0) {
        const files = event.target.files;
        console.log(files);
        }
        }
}