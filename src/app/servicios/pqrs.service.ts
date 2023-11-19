import { Injectable } from '@angular/core';
import { ItemPQRSDTO } from '../modelo/item-pqrsdto';
import { RegistroPQRSDTO } from '../modelo/registro-pqrsdto';

@Injectable({
  providedIn: 'root'
})
export class PqrsService {
  pqrs: ItemPQRSDTO[];
  constructor() {
  this.pqrs = [];
  }
  public listar(): ItemPQRSDTO[] {
  return this.pqrs;
  }
  public obtener(codigo: number): ItemPQRSDTO | undefined{
  return this.pqrs.find(pqrs => pqrs.codigo == codigo);
  }
  public crear(pqrs: RegistroPQRSDTO){
  let codigo = this.pqrs.length + 1;
  }
}  
