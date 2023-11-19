import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Alerta } from 'src/app/modelo/alerta';
import { DetallePacienteDTO } from 'src/app/modelo/detalle-paciente-dto';
import { RegistroPacienteDTO } from 'src/app/modelo/registro-paciente-dto';
import { AuthService } from 'src/app/servicios/auth.service';
import { ClinicaService } from 'src/app/servicios/clinica.service';
import { ImagenService } from 'src/app/servicios/imagen.service';
import { UsuarioService } from 'src/app/servicios/paciente.service';
import { TokenService } from 'src/app/servicios/token.service';

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
  selectedCiudad: string = "";
  codigoPaciente: number = 0;
  detallePaciente: DetallePacienteDTO;


  constructor(private clinicaService: ClinicaService,private authService : AuthService,
     private router: Router, private tokenService: TokenService,
    private imagenService: ImagenService,
    private pacienteService: UsuarioService) {
    this.registroPacienteDTO = new RegistroPacienteDTO();
    this.detallePaciente = new DetallePacienteDTO();
    this.cargarCiudades();
    this.cargarEps();
    this.cargarTipoSangre();
    this.obtenerPaciente();
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
    this.pacienteService.editarPerfil()
  }

  public obtenerPaciente(){
    this.codigoPaciente=this.tokenService.getCodigo();
    this.pacienteService.obtenerPaciente(this.codigoPaciente).subscribe({
      next: data =>{
        this.detallePaciente = data.respuesta;
        console.log(this.detallePaciente, "yyyyyyyyyyy")
      },
      error: error => {
        alert(error.error.respuesta);
      }
    })
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
