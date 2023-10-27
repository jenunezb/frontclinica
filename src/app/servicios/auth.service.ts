import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { SesionDTO } from '../modelo/sesion-dto';
import { PacienteDTO } from '../modelo/paciente-dto';
import { Observable } from 'rxjs';
@Injectable({
providedIn: 'root'
})
export class AuthService {
private authURL = "http://localhost:8080/api/auth";
constructor(private http:HttpClient) { }

public registrar(paciente:PacienteDTO):Observable<MensajeDTO>{
  return this.http.post<MensajeDTO>(`${this.authURL}/registro`, paciente);
  }

  public login(sesion:SesionDTO):Observable<MensajeDTO>{
    return this.http.post<MensajeDTO>(`${this.authURL}/login`, sesion);
    }

}
