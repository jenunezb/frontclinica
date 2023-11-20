import { Component } from '@angular/core';
import { Alerta } from 'src/app/modelo/alerta';
import { ItemCitaPacienteDTO } from 'src/app/modelo/item-cita-paciente-dto';
import { MedicosDisponiblesDTO } from 'src/app/modelo/medicos-disponibles-dto';

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
  
  constructor(){
    this.itemCitaPacienteDTO = new ItemCitaPacienteDTO();
    this.medicosDisponibles = new MedicosDisponiblesDTO();
  }
  public crearCita(){

  }
}
