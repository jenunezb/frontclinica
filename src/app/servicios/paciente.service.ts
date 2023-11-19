import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { RegistroPQRSDTO } from '../modelo/registro-pqrsdto';
import { DetallePacienteDTO } from '../modelo/detalle-paciente-dto';

@Injectable({
providedIn: 'root'
})

export class UsuarioService {

  pacienteDTO: DetallePacienteDTO;
  private userUrl = "http://localhost:8080/api/pacientes";
  constructor(private http: HttpClient) {
    this.pacienteDTO = new DetallePacienteDTO();
   }
  public verDetallePaciente(codigo: number): Observable<MensajeDTO> {
  return this.http.get<MensajeDTO>(`${this.userUrl}/detalle/${codigo}`);
  }
  public eliminarCuenta(codigo: number): Observable<MensajeDTO> {
  return this.http.delete<MensajeDTO>(`${this.userUrl}/eliminar/${codigo}`);
  }
  public editarPerfil(codigo: number): Observable<MensajeDTO> {
  return this.http.put<MensajeDTO>(`${this.userUrl}/editar-perfil`, this.pacienteDTO);
  }
  public crearPQRS(registroPQRSDTO: RegistroPQRSDTO): Observable<MensajeDTO> {
  return this.http.post<MensajeDTO>(`${this.userUrl}/crear-pqrs`, registroPQRSDTO);
  }
  public listarPQRSPaciente(codigoPaciente: number): Observable<MensajeDTO> {
  return this.http.get<MensajeDTO>(`${this.userUrl}/listar-pqrs/${codigoPaciente}`);
  }
  public obtenerPaciente(codigoPaciente:number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.userUrl}/obtener/${codigoPaciente}`);
  }
  }