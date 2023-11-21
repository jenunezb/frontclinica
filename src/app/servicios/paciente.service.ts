import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { RegistroPQRSDTO } from '../modelo/registro-pqrsdto';
import { DetallePacienteDTO } from '../modelo/detalle-paciente-dto';
import { MedicosDisponiblesDTO } from '../modelo/medicos-disponibles-dto';
import { ItemCitaPacienteDTO } from '../modelo/item-cita-paciente-dto';
import { CitaDTO } from '../modelo/cita-dto';

@Injectable({
providedIn: 'root'
})

export class UsuarioService {

  pacienteDTO: DetallePacienteDTO;
  private userUrl = "http://localhost:8080/api/pacientes";
  constructor(private http: HttpClient) {
    this.pacienteDTO = new DetallePacienteDTO();
   }

  public editarPerfil(detallePaciente: DetallePacienteDTO): Observable<MensajeDTO> {
  return this.http.put<MensajeDTO>(`${this.userUrl}/editar-perfil`, detallePaciente);
  }
 
  public listarPQRSPaciente(codigoPaciente: number): Observable<MensajeDTO> {
  return this.http.get<MensajeDTO>(`${this.userUrl}/listar-pqrs/${codigoPaciente}`);
  }
  public obtenerPaciente(codigoPaciente:number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.userUrl}/obtener/${codigoPaciente}`);
  }
  public medicosDisponibles( medicosDisponibles: MedicosDisponiblesDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.userUrl}/listar-medicos`, medicosDisponibles);
  }
  public agendarCita( itemCitaPacienteDTO: ItemCitaPacienteDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.userUrl}/cita`, itemCitaPacienteDTO);
  }
  // faltantes

  public eliminarCuenta(codigo: number): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.userUrl}/eliminar/${codigo}`);
    }

  public crearPQRS(registroPQRSDTO: RegistroPQRSDTO): Observable<MensajeDTO> {
    console.log(registroPQRSDTO);
    return this.http.post<MensajeDTO>(`${this.userUrl}/crear-pqrs/`, registroPQRSDTO);
    }

  public listarCitas(codigo: number): Observable<CitaDTO[]>{
      return this.http.get<CitaDTO[]>(`${this.userUrl}/listar-citas/${codigo}`);
  }
  public historialMedico(codigo: number): Observable<ItemCitaPacienteDTO[]>{
    return this.http.get<ItemCitaPacienteDTO[]>(`${this.userUrl}/historial/${codigo}`);
}
  
  }