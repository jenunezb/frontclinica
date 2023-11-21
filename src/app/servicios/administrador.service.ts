import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { RegistroMedicoDTO } from '../modelo/registro-medico-dto';
import { DetalleMedicoDTO } from '../modelo/detalle-medico-dto';
import { ItemPQRSDTO } from '../modelo/item-pqrsdto';
import { DetallePQRSDTO } from '../modelo/detalle-pqrsdto';
import { RespuestaDTO } from '../modelo/respuesta-dto';
import { ItemCitaAdminDTO } from '../modelo/item-cita-admin-dto';
import { EstadoPQRS } from '../modelo/estado-pqrs';
import { HistorialConsultas } from '../modelo/historial-consultas';
import { ItemPacienteDTO } from '../modelo/item-paciente-dto';
import { ItemMedicoDTO } from '../modelo/item-medico.dto';
import { EstadoDTO } from '../modelo/estado-dto';
@
Injectable({
  providedIn: 'root'
})
export class AdministradorService {
  private administradorURL = "http://localhost:8080/api/admins";

  constructor(private http: HttpClient) { }

  public crearMedico(medico: RegistroMedicoDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.administradorURL}/registro`, medico);
  }

  public actualizarMedico(detalleMedico: DetalleMedicoDTO): Observable<MensajeDTO> {
    // Ajusta la URL y el tipo de solicitud según tu API
    return this.http.put<MensajeDTO>(`${this.administradorURL}/actualizar`, detalleMedico);
  }

  public eliminarMedico(codigoMedico: number): Observable<MensajeDTO> {
    // Ajusta la URL y el tipo de solicitud según tu API
    return this.http.delete<MensajeDTO>(`${this.administradorURL}?codigo=${codigoMedico}`);
  }

  public listarMedicos(): Observable<ItemMedicoDTO[]> {
    return this.http.get<ItemMedicoDTO[]>(`${this.administradorURL}/listaMedicos`);
  }

  public obtenerMedico(codigoMedico: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.administradorURL}/${codigoMedico}`);
  }

  public listarPQRS(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.administradorURL}/listar-pqrs`);
  }

  public verDetallePQRS(codigo: number): Observable<DetallePQRSDTO> {
    return this.http.get<DetallePQRSDTO>(`${this.administradorURL}/ver-detalle-pqrs/${codigo}`);
  }

  public responderPQRS(respuesta: RespuestaDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.administradorURL}/responder-pqrs`, respuesta);
  }

  public listarCitas(): Observable<ItemCitaAdminDTO[]> {
    return this.http.get<ItemCitaAdminDTO[]>(`${this.administradorURL}/listar-citas`);
  }

  public cambiarEstadoPQRS(estadoPQRS: EstadoPQRS): Observable<MensajeDTO> {
    return this.http.put<MensajeDTO>(`${this.administradorURL}/cambiar-estado-pqrs/`, estadoPQRS);
  }

  public verHistorialDeConsultas(): Observable<HistorialConsultas[]> {
    return this.http.get<HistorialConsultas[]>(`${this.administradorURL}/historial-consultas`);
  }

  public verHistorialDeConsultasMedico(codigoMedico: number): Observable<HistorialConsultas[]> {
    return this.http.get<HistorialConsultas[]>(`${this.administradorURL}/historial-consultas-medico/${codigoMedico}`);
  }

  public listarTodos(): Observable<ItemPacienteDTO[]> {
    return this.http.get<ItemPacienteDTO[]>(`${this.administradorURL}/listar-todos`);
  }
}
