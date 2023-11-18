import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { RegistroPacienteDTO } from '../modelo/registro-paciente-dto';

@Injectable({
providedIn: 'root'
})

export class UsuarioService {
  
private userUrl = "http://localhost:8080/api/usuarios";

constructor(private http: HttpClient) { }
public obtener(codigo: number): Observable<MensajeDTO> {
return this.http.get<MensajeDTO>(`${this.userUrl}/${codigo}`);
}

public eliminar(codigo: number): Observable<MensajeDTO> {
return this.http.delete<MensajeDTO>(`${this.userUrl}/${codigo}`);
}

public actualizar(codigo:number, paciente:RegistroPacienteDTO): Observable<MensajeDTO> {
  return this.http.put<MensajeDTO>(`${this.userUrl}/${codigo}`, paciente);
  }
  }