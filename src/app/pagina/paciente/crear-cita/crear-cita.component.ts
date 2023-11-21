import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Alerta } from 'src/app/modelo/alerta';
import { ItemCitaPacienteDTO } from 'src/app/modelo/item-cita-paciente-dto';
import { MedicosDisponiblesDTO } from 'src/app/modelo/medicos-disponibles-dto';
import { MedicosHoraDTO } from 'src/app/modelo/medicos-hora-dto';
import { ClinicaService } from 'src/app/servicios/clinica.service';
import { UsuarioService } from 'src/app/servicios/paciente.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-crear-cita',
  templateUrl: './crear-cita.component.html',
  styleUrls: ['./crear-cita.component.css']
})
export class CrearCitaComponent {

  medicos: MedicosHoraDTO[]=[];
  medicoSeleccionado: MedicosHoraDTO | null = null;
  especialidades: string[]= [];
  alerta !:Alerta;
  itemCitaPacienteDTO:ItemCitaPacienteDTO;
  medicosDisponibles:MedicosDisponiblesDTO;
  fecha:string="";
  hora:string="";
  
  constructor(private pacienteService: UsuarioService, 
    private clinicaService: ClinicaService, private tokenService: TokenService,
    private router: Router){
    this.itemCitaPacienteDTO = new ItemCitaPacienteDTO();
    this.medicosDisponibles = new MedicosDisponiblesDTO();
    this.cargarEspecialidades();
  }
  public crearCita(){
    this.itemCitaPacienteDTO.idPaciente= this.tokenService.getCodigo();
    this.itemCitaPacienteDTO.fechaCita=this.fecha + "T" + this.hora;
    console.log(this.itemCitaPacienteDTO);
    
    this.pacienteService.agendarCita(this.itemCitaPacienteDTO).subscribe({
      next: data => {
        console.log(data, "data");
        
        alert(JSON.stringify(data.respuesta));
    setTimeout(() => {
      this.router.navigate(['/lista-citas']); // Redirige a la página principal
    }, 5);
      },
      error: error => {
        this.alerta = { mensaje: error.error, tipo: "danger" };
      }
    });
  }
  public buscarMedico(){
    this.pacienteService.medicosDisponibles(this.medicosDisponibles).subscribe({
      next: data => {
        this.medicos = data.respuesta;

        if (this.medicos.length > 0) {
          // Seleccionar el primer médico del array
          const primerMedico = this.medicos[0];
          // Asignar valores a itemCitaPacienteDTO
          

          this.itemCitaPacienteDTO.idMedico = primerMedico.codigoMedico;
          this.itemCitaPacienteDTO.fechaCita=this.medicosDisponibles.fecha;
          this.hora=primerMedico.horaDisponible;

          this.fecha= this.medicosDisponibles.fecha;

          console.log(this.medicos);
      } else {
          console.error('No hay médicos disponibles.');
      }
        this.itemCitaPacienteDTO.fechaCita=data.respuesta.horaDisponible;
      },
      error: error => {
        this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
      }
    });
  }

  private cargarEspecialidades(){
    this.clinicaService.listarEspecialidades().subscribe({
      next: data => {
        this.especialidades = data.respuesta;
      },
      error: error => {
        this.alerta = { mensaje: error.error, tipo: "danger" };
      }
    });
  }


}
