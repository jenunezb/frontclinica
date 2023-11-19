import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Alerta } from 'src/app/modelo/alerta';
import { RegistroPacienteDTO } from 'src/app/modelo/registro-paciente-dto';
import { AuthService } from 'src/app/servicios/auth.service';
import { ClinicaService } from 'src/app/servicios/clinica.service';
import { ImagenService } from 'src/app/servicios/imagen.service';

@Component({
  selector: 'app-gestion-paciente-component',
  templateUrl: './gestion-paciente-component.component.html',
  styleUrls: ['./gestion-paciente-component.component.css']
})
export class GestionPacienteComponentComponent {
  alerta!: Alerta;
  ciudades: string[] = [];
  eps: string[] = [];
  archivos!:FileList;
  tipoSangre: string[]= [];
  registroPacienteDTO: RegistroPacienteDTO;
  selectedCiudad: string = ""; // Nueva propiedad para manejar la selección

  constructor(private clinicaService: ClinicaService,private authService : AuthService, private router: Router, 
    private imagenService: ImagenService) {
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

  public editar(){

  }
  public subirImagen() {
    if (this.archivos != null && this.archivos.length > 0) {
    const formData = new FormData();
    formData.append('file', this.archivos[0]);
    this.imagenService.subir(formData).subscribe({
    next: data => {
    this.registroPacienteDTO.urlFoto = data.respuesta.url;
    },
    error: error => {
    this.alerta = { mensaje: error.error, tipo: "danger" };
    }
    });
    } else {
    this.alerta = { mensaje: 'Debe seleccionar una imagen y subirla', tipo: "danger" };
    }
    }

    public sonIguales():boolean{
      return this.registroPacienteDTO.password == this.registroPacienteDTO.confirmaPassword;
      }


     public onFileChange(event: any) {
if (event.target.files.length > 0) {
this.registroPacienteDTO.urlFoto = event.target.files[0].name;
this.archivos = event.target.files;
}
}

}
