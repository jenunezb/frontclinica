import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClinicaService {

  private clinicaURL = "http://localhost:8080/api/clinica";

  constructor(private http: HttpClient) { }
  public listarCiudades(): Observable<MensajeDTO> {
  return this.http.get<MensajeDTO>(`${this.clinicaURL}/ciudades`);
  }
  public listarEspecialidades(): Observable<MensajeDTO> {
  return this.http.get<MensajeDTO>(`${this.clinicaURL}/lista-especialidades`);
  }
  public listarTipoSangre(): Observable<MensajeDTO> {
  return this.http.get<MensajeDTO>(`${this.clinicaURL}/tipo-sangre`);
  }
  public listarEPS(): Observable<MensajeDTO> {
  return this.http.get<MensajeDTO>(`${this.clinicaURL}/eps`);
  }
  public enviarLinkRecuperacion(correo:string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.clinicaURL}?correo=${correo}`);
    }
}
