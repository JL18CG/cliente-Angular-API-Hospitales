import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      title: 'Dasboard!',
      icon: 'mdi mdi-gauge',
        submenu:[
          {title: 'Main', path:'/'},
          {title: 'Progresos', path:'progresos'},
          {title: 'Gráficas', path:'graficas'},
          {title: 'Promesas', path:'promesas'},
          {title: 'Rxjs', path:'rxjs'},
          
        ]
    }
  ]

  constructor() { }
}
