import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AuthGuard } from '../guards/auth.guard';
import { PerfilComponent } from './perfil/perfil.component';


const routes: Routes = [
    {
        path:'dashboard', component: PagesComponent, 
        canActivate:[AuthGuard],
        children:[
          {path:'', component:DashboardComponent, data:{title: "Dashboard"}},
          {path:'progresos', component:ProgressComponent, data:{title: "Progresos"}},
          {path:'graficas', component:Grafica1Component, data:{title: "Gráficas"}},
          {path:'configuracion-de-cuenta', component:AccountSettingsComponent, data:{title: "Configuración de la Cuenta"}},
          {path:'promesas', component:PromesasComponent, data:{title: "Promesas"}},
          {path:'rxjs', component:RxjsComponent, data:{title: "Rxjs"}},
          {path:'perfil', component:PerfilComponent, data:{title: "Perfil"}}
        ]
      }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
