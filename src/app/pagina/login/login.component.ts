import { Component } from '@angular/core';
import { Alerta } from 'src/app/modelo/alerta';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService: AuthService){}
  
}
