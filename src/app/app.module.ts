import * as $ from 'jquery';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  CommonModule,
  LocationStrategy,
  HashLocationStrategy
} from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from '@agm/core';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { NavigationComponent } from './cooperativa/base/base/shared/header-navigation/navigation.component';
import { SidebarComponent } from './cooperativa/base/base/shared/sidebar/sidebar.component';
import { BreadcrumbComponent } from './cooperativa/base/base/shared/breadcrumb/breadcrumb.component';

import { Approutes } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpinnerComponent } from './cooperativa/base/base/shared/spinner.component';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { ApiService } from './services/api.service';
import { LoginService } from './services/login/login.service';
import { PruebaComponent } from './cooperativa/prueba/prueba.component';
import { LoginComponent } from './cooperativa/login/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginGuard } from './cooperativa/login/guards/login.guard';
import { BaseComponent } from './cooperativa/base/base/base.component';
import { BuscarMonedaComponent } from './cooperativa/busqueda/buscar-moneda/buscar-moneda.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 1,
  wheelPropagation: true,
  minScrollbarLength: 20
};

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    NavigationComponent,
    BreadcrumbComponent,
    SidebarComponent,
    PruebaComponent,
    LoginComponent,
    BaseComponent,
    BuscarMonedaComponent,
  ],
  imports: [
    // Ng2SmartTableModule,    //Mover a la module de agencia
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    SlimLoadingBarModule.forRoot(),
    RouterModule.forRoot(Approutes, { useHash: false }),
    PerfectScrollbarModule,
    NgMultiSelectDropDownModule.forRoot(),
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyBUb3jDWJQ28vDJhuQZxkC0NXr_zycm8D0' })
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    LoginGuard,
    ApiService,
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
