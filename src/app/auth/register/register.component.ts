import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'

import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css'
  ]
})
export class RegisterComponent {

  public formSubmitted = false;


  public registerForm = this.fb.group({
    nombre:['diego-diego', [Validators.required]],
    email:['diego@diego.com', [Validators.required,Validators.email]],
    password:['1234', [Validators.required]],
    password2:['1234', [Validators.required]],
    terms:[true, [Validators.required]]
  }, {
    validators: this.passwordsIguales('password','password2')
  });

  constructor( private fb: FormBuilder, private usuarioService :UsuarioService, private router:Router) { }

  crearUsuario(){
    this.formSubmitted = true;
    
    if(this.registerForm.invalid){
      return;
    }

    //realizar posteo
    this.usuarioService.crearusuario(this.registerForm.value).subscribe(resp=>{
           //navegar dashboard
           this.router.navigateByUrl('/');
    }, (err)=>{
      //si sucede un error
      Swal.fire('Error', err.error.msg, 'error');
    });

  }

  campoNoValido(campo:string):boolean {

    if(this.registerForm.get(campo).invalid && this.formSubmitted){
      return true;
    }else{
      return false;
    }  

  }

  contraNoValida() {
    const pass1 = this.registerForm.get('password').value;  
    const pass2 = this.registerForm.get('password2').value;  

    if( (pass1 !== pass2) && this.formSubmitted){
      return true;
    }else{
      return false;
    }

  }


  aceptaTerminos(){
    return !this.registerForm.get('terms').value && this.formSubmitted;
  }


  passwordsIguales(pass1Name: string , pass2Name:string){
    
    return (formGroup: FormGroup) =>{
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if(pass1Control.value === pass2Control.value){
        pass2Control.setErrors(null);  
      }else{
        pass2Control.setErrors({
          noEsIgual: true
        });
      }

    }
  }
 
}
