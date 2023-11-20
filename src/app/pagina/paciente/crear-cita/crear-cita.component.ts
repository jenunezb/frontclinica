import { Component } from '@angular/core';
import { Alerta } from 'src/app/modelo/alerta';
import { ItemCitaPacienteDTO } from 'src/app/modelo/item-cita-paciente-dto';
import { MedicosDisponiblesDTO } from 'src/app/modelo/medicos-disponibles-dto';
import { ClinicaService } from 'src/app/servicios/clinica.service';
import { UsuarioService } from 'src/app/servicios/paciente.service';

@Component({
  selector: 'app-crear-cita',
  templateUrl: './crear-cita.component.html',
  styleUrls: ['./crear-cita.component.css']
})
export class CrearCitaComponent {

  medico: string[]= [];
  especialidades: string[]= [];
  alerta !:Alerta;
  itemCitaPacienteDTO:ItemCitaPacienteDTO;
  medicosDisponibles:MedicosDisponiblesDTO;
  
  constructor(private pacienteService: UsuarioService, private clinicaService: ClinicaService){
    this.itemCitaPacienteDTO = new ItemCitaPacienteDTO();
    this.medicosDisponibles = new MedicosDisponiblesDTO();
    this.cargarEspecialidades();
  }
  public crearCita(){

  }
  public buscarMedico(){
    this.pacienteService.medicosDisponibles(this.medicosDisponibles).subscribe({
      next: data => {
        this.medico = data.respuesta;
      },
      error: error => {
        console.log(error,"cualquier cosa");
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
