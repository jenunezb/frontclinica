import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MedicoDTO } from 'src/app/modelo/medico-dto';

@Component({
  selector: 'app-registro-medico',
  templateUrl: './registro-medico.component.html',
  styleUrls: ['./registro-medico.component.css']
})
export class RegistroMedicoComponent implements OnInit{
    registroForm!:FormGroup;
    medico:MedicoDTO;
    constructor(private formBuilder: FormBuilder){
    this.medico = new MedicoDTO();
    }
    ngOnInit(): void {
        throw new Error('Method not implemented.');
    }
    private crearFormulario(){
        this.registroForm = this.formBuilder.group({
        nombre: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        direccion: new FormControl('', [Validators.required]),
        telefono: new FormControl('', [Validators.required, Validators.maxLength(10)]),
        password: new FormControl('', [Validators.required, Validators.maxLength(50)])
        });
        }
    public registrar(){
        console.log(this.medico);
        }
    
    public sonIguales():boolean{
            return this.medico.password == this.medico.confirmaPassword;
            }
    
    onFileChange(event:any){
                if (event.target.files.length > 0) {
                const files = event.target.files;
                console.log(files);
                }
                }
                
}
