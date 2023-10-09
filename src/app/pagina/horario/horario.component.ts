import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.css']
})
export class HorarioComponent {
  nombresMeses: string[] = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  // Declaración de otras propiedades
  mesMostrado: number = new Date().getMonth();
  diasDelMes: number[] = [];

  // Constructor para inyectar DatePipe
  constructor(private datePipe: DatePipe, private router: Router) {
    this.actualizarDiasDelMes();
  }

  mesAnterior() {
    this.mesMostrado = (this.mesMostrado - 1 + 12) % 12;
    this.actualizarDiasDelMes();
  }

  mesSiguiente() {
    this.mesMostrado = (this.mesMostrado + 1) % 12;
    this.actualizarDiasDelMes();
  }

  // Función para actualizar los días del mes actual
  actualizarDiasDelMes() {
    const year = new Date().getFullYear();
    const firstDay = new Date(year, this.mesMostrado, 1);

    // Ajustar el primer día del mes para reflejar el día real de la semana
    const primerDiaReal = firstDay.getDay(); // 0 para domingo, 1 para lunes, etc.

    this.diasDelMes = [];

    // Llenar los días antes del primer día del mes actual con días del mes anterior
    for (let i = primerDiaReal; i > 0; i--) {
      const diaMesAnterior = new Date(year, this.mesMostrado, 0).getDate();
      this.diasDelMes.push(diaMesAnterior - i + 1);
    }

    // Llenar los días del mes actual
    const lastDay = new Date(year, this.mesMostrado + 1, 0);
    for (let day = 1; day <= lastDay.getDate(); day++) {
      this.diasDelMes.push(day);
    }
  }

  redirigirAPagina(dia: number) {
    // Suponiendo que tengas una ruta llamada "detalle" que toma un parámetro "dia"
    this.router.navigate(['horario', dia]);
  }
}
