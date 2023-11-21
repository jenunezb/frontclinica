import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Alerta } from 'src/app/modelo/alerta';
import { SesionDTO } from 'src/app/modelo/sesion-dto';
import { AuthService } from 'src/app/servicios/auth.service';
import { TokenService } from 'src/app/servicios/token.service';
import { ClinicaService } from 'src/app/servicios/clinica.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  ngOnInit() {
    // Verificar si el usuario ya está autenticado
    if (this.authService.estaAutenticado()) {
      // Redirigir a la página principal o el dashboard
      this.router.navigate(['/dashboard']); // Reemplaza '/dashboard' con tu ruta deseada
    }
  }

  sesionDTO: SesionDTO;
  alerta!: Alerta;

  constructor(private authService: AuthService, private router: Router, private tokenService: TokenService, private clinicaService:ClinicaService){
  this.sesionDTO = new SesionDTO();
  }

  public login(){
    this.authService.login(this.sesionDTO).subscribe({
    next: data => {
    this.tokenService.login(data.respuesta.token);
  },

  error: err => {
      this.alerta = { mensaje: err.error.respuesta, tipo: "danger" };
  }
});
  }

  public olvidePassword(){
    this.clinicaService.enviarLinkRecuperacion(this.sesionDTO.email).subscribe({
      next: data => {
      alert(JSON.stringify(data.respuesta));
    },
    error: err => {
      this.alerta = { mensaje: err.error.respuesta, tipo: "danger" };
  }});
  }
}
