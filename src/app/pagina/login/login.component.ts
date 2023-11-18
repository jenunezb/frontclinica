import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Alerta } from 'src/app/modelo/alerta';
import { SesionDTO } from 'src/app/modelo/sesion-dto';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  sesionDTO: SesionDTO;

  constructor(private authService: AuthService, private router: Router){
this.sesionDTO = new SesionDTO();
  }
  
  public login(){
    this.authService.login(this.sesionDTO).subscribe({
      next:data => {
        console.log(data.respuesta);
        this.router.navigate(['/']); // Redirige a la página principal

      },
      error: error =>{
        alert(error.error.respuesta);
      }
    })
  }
}
