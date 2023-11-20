import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ItemCitaAdminDTO } from 'src/app/modelo/item-cita-admin-dto';
import { AdministradorService } from 'src/app/servicios/administrador.service';

@Component({
  selector: 'app-listar-citas',
  templateUrl: './listar-citas.component.html',
  styleUrls: ['./listar-citas.component.css']
})
export class ListarCitasComponent {
  public listaCitas: ItemCitaAdminDTO[] = [];

  constructor(private administardorService: AdministradorService, private router : Router){}

  ngOnInit(): void {
    this.listarCitas();
  }

  public listarCitas(): void{
this.administardorService.listarCitas().subscribe(
  (response: any) => {
    console.log('Respuesta del servicio:', response.respuesta);
    this.listaCitas = response.respuesta;
},
error => {
  console.error('Error al obtener la lista de citas', error);
}
);

  }

  public editarCita(){

  }
}
