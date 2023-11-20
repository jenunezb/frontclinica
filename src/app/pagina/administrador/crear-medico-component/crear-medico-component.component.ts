import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Alerta } from 'src/app/modelo/alerta';
import { MensajeDTO } from 'src/app/modelo/mensaje-dto';
import { RegistroMedicoDTO } from 'src/app/modelo/registro-medico-dto';
import { AdministradorService } from 'src/app/servicios/administrador.service';
import { ClinicaService } from 'src/app/servicios/clinica.service';
import { ImagenService } from 'src/app/servicios/imagen.service';


@Component({
  selector: 'app-crear-medico-component',
  templateUrl: './crear-medico-component.component.html',
  styleUrls: ['./crear-medico-component.component.css']
})
export class CrearMedicoComponentComponent {
  alerta!: Alerta;
  archivos!:FileList;
  registroMedicoDTO: RegistroMedicoDTO;
  ciudades: string[] = [];
  especialidades: string[] = [];
  constructor(private imagenService: ImagenService,
    private clinicaService: ClinicaService,
    private administradorService: AdministradorService, private router: Router){
    this.registroMedicoDTO = new RegistroMedicoDTO();
    this.cargarCiudades();
    this.cargarEspecialidades();
  }

  public subirImagen() {
    if (this.archivos && this.archivos.length > 0) {
      const formData = new FormData();
      formData.append('multipartFile', this.archivos[0]);

      this.imagenService.subir(formData).subscribe({
        next: (data: MensajeDTO) => {
          console.log("Se subio la imagen", data.respuesta.url)
          this.registroMedicoDTO.urlFoto = data.respuesta.url;
          console.log("Se subio la imagen", data)
        },
        error: (error) => {
          console.error("Error al subir la imagen", error);
          this.alerta = { mensaje: 'Error al subir la imagen', tipo: "danger" };
        }
      });
    } else {
      this.alerta = { mensaje: 'Debe seleccionar una imagen y subirla', tipo: "danger" };
    }
  }


 public registrar(){
   if(this.archivos != null && this.archivos.length > 0){
     console.log(this.registroMedicoDTO);
     this.administradorService.crearMedico(this.registroMedicoDTO).subscribe({
       next: data =>{
         this.registroMedicoDTO = data.respuesta;
         alert(JSON.stringify(data.respuesta));
         console.log("Te registraste")
     setTimeout(() => {
       this.router.navigate(['/login']); // Redirige a la página principal
     }, 2000);
       },
       error: error => {
         // Muestra un mensaje emergente con la información del error
         alert(error.error.respuesta);
       }
     }
     );
     }else{
     console.log("Debe cargar una foto");
     }

 }
public sonIguales():boolean{
  return this.registroMedicoDTO.password == this.registroMedicoDTO.confirmaPassword;
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

private cargarEspecialidades() {
  this.clinicaService.listarEspecialidades().subscribe({
    next: data => {
      this.especialidades = data.respuesta;
    },
    error: error => {
      console.log(error);
    }
  });
}

public onFileChange(event: any) {
  if (event.target.files.length > 0) {
  this.registroMedicoDTO.urlFoto = event.target.files[0];
  this.archivos = event.target.files;
  }
  }

}
