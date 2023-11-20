import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Alerta } from 'src/app/modelo/alerta';
import { DetalleMedicoDTO } from 'src/app/modelo/detalle-medico-dto';
import { MensajeDTO } from 'src/app/modelo/mensaje-dto';
import { AdministradorService } from 'src/app/servicios/administrador.service';
import { ClinicaService } from 'src/app/servicios/clinica.service';
import { ImagenService } from 'src/app/servicios/imagen.service';

@Component({
  selector: 'app-editar-medico',
  templateUrl: './editar-medico.component.html',
  styleUrls: ['./editar-medico.component.css']
})
export class EditarMedicoComponent  {

  alerta!: Alerta;
  archivos!:FileList;
  detalleMedico: DetalleMedicoDTO;
  ciudades: string[] = [];
  especialidades: string[] = [];
  id: number=0;

  constructor(private imagenService: ImagenService,
    private clinicaService: ClinicaService,
    private administradorService: AdministradorService, private router: Router, private route: ActivatedRoute){
    this.detalleMedico = new DetalleMedicoDTO();
    this.cargarCiudades();
    this.cargarEspecialidades();
    this.obtenerCodigoMedico();
    this.obtenerMedico();
  }

  obtenerCodigoMedico() {
    // Obtén el valor del parámetro 'id' de la URL
    this.route.params.subscribe(params => {
      this.id= +params['codigo'];
      console.log(this.id);
    });
  }

  public subirImagen() {
    if (this.archivos && this.archivos.length > 0) {
      const formData = new FormData();
      formData.append('multipartFile', this.archivos[0]);

      this.imagenService.subir(formData).subscribe({
        next: (data: MensajeDTO) => {
          console.log("Se subio la imagen", data.respuesta.url)
          this.detalleMedico.urlFoto = data.respuesta.url;
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

 public editar(){
   if(this.archivos != null && this.archivos.length > 0){
     console.log(this.detalleMedico);
     this.administradorService.actualizarMedico(this.detalleMedico).subscribe({
       next: data =>{
         this.detalleMedico = data.respuesta;
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
  this.detalleMedico.urlFoto = event.target.files[0];
  this.archivos = event.target.files;
  }
  }

  public obtenerMedico(){
    console.log(this.id);
    this.administradorService.obtenerMedico(this.id).subscribe({
      next: data =>{
        this.detalleMedico = data.respuesta;
        console.log(this.detalleMedico, "yyyyyyyyyyy")
      },
      error: error => {
        alert(error.error.respuesta);
      }
    })
  }
}


