import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Resolver } from 'dns';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;
declare const gapi:any;


@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
  
  public auth2:any;
  public usuario: Usuario;


  constructor(private http : HttpClient, private router:Router, private ngZone:NgZone) { 
    this.googleInit();
  }

  googleInit(){

    return new Promise( (resolve:any, reject) =>{
      gapi.load('auth2', ()=>{
        this.auth2 = gapi.auth2.init({
          client_id: '236706899772-1hvgfskso3f2jjpimvj7i5lq3hfud0j1.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });

        resolve();
      });
    })

  }


  logOut(){
    localStorage.removeItem('token');

    this.auth2.signOut().then(() => {
      this.ngZone.run(()=>{
        this.router.navigateByUrl('/iniciar-sesion');
      });
    });


  }

  validarToken() : Observable<boolean>{
    const token = localStorage.getItem('token') || '';
    return this.http.get(`${base_url}/login/renew`,{
      headers:{
        'x-token':token
      }
    }).pipe(
      map ( (resp:any) =>{
        
        const { email,google,nombre,role,img,uid} =resp.usuario;
        
        this.usuario = new Usuario(nombre, email, '', img ,google, role, uid);
        localStorage.setItem('token', resp.token);
        return true;
      }),

      catchError( error => of(false))
    );
  }

  crearusuario(formData: RegisterForm){
    return this.http.post(`${base_url}/usuarios`, formData).pipe(
      tap( (resp:any) => {
        localStorage.setItem('token', resp.token)
      })
    );
  }


  login(formData: LoginForm){
    return this.http.post(`${base_url}/login`, formData).pipe(
      tap( (resp:any) => {
        localStorage.setItem('token', resp.token)
      })
    );
  }

  loginGoogle(token){
    return this.http.post(`${base_url}/login/google`, {token}).pipe(
      tap( (resp:any) => {
        localStorage.setItem('token', resp.token)
      })
    );
  }

}
