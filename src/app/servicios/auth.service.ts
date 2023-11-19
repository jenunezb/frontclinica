import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { SesionDTO } from '../modelo/sesion-dto';
import { Observable } from 'rxjs';
import { RegistroPacienteDTO } from '../modelo/registro-paciente-dto';
import { TokenService } from './token.service';

@Injectable({
providedIn: 'root'
})

export class AuthService {
  
private authURL = "http://localhost:8080/api/auth";
constructor(private http:HttpClient, private tokenService: TokenService) { }

public registrar(paciente:RegistroPacienteDTO):Observable<MensajeDTO>{
  console.log('pasa');
  return this.http.post<MensajeDTO>(`${this.authURL}/registro`, paciente);
  }

  public login(sesion:SesionDTO):Observable<MensajeDTO>{
    return this.http.post<MensajeDTO>(`${this.authURL}/login`, sesion);
    }

    public estaAutenticado(): boolean {
      let codigo = this.tokenService.getCodigo();
      if(codigo!=0){
        return true;
      }
      return false;
    }
}