import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PruebaComponent } from './cooperativa/prueba/prueba.component';
import { LoginComponent } from './cooperativa/login/login/login.component';
import { LoginGuard } from './cooperativa/login/guards/login.guard';
import { BaseComponent } from './cooperativa/base/base/base.component';

export const Approutes: Routes = [
  { path: 'login', component: LoginComponent },

  {
    path: '',
    component: BaseComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', canActivate: [LoginGuard], component: PruebaComponent },
      { path: 'adm', canActivate: [LoginGuard], 
              loadChildren: () => import('./cooperativa/configuracion/configuracion.module').then(m => m.ConfiguracionModule) },
      { path: 'aso', canActivate: [LoginGuard],
              loadChildren: () => import('./cooperativa/asociado/asociado.module').then(m=>m.AsociadoModule) },
    ]
  },

  { path: '**', redirectTo: 'home' }
];
