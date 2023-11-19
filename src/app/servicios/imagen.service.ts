import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { Observable } from 'rxjs';
import { ImagenDTO } from '../modelo/imagen-dto';
@Injectable({
  providedIn: 'root'
  })
  export class ImagenService {
  private imgURL = "http://localhost:8080/api/imagenes";
  constructor(private http: HttpClient) { }
  public subir(imagen: FormData): Observable<MensajeDTO> {
  return this.http.post<MensajeDTO>(`${this.imgURL}/upload`, imagen);
  }
  public eliminar(imagenDTO: ImagenDTO): Observable<MensajeDTO> {
  return this.http.request<MensajeDTO>('delete', `${this.imgURL}/eliminar`, { body:
  imagenDTO});
  }
  }