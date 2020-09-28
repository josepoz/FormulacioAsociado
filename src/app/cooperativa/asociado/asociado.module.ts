import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ToastrModule } from "ngx-toastr";
import { AsociadoRoutes } from "./asociado.routing";
import { ProfesionService } from "src/app/services/asociado/profesion.service";
import { ProfesionesComponent } from "./profesion/profesiones/profesiones.component";
import { AddProfesionComponent } from "./profesion/add-profesion/add-profesion.component";
import { EscolaridadesComponent } from './escolaridad/escolaridades/escolaridades.component';
import { AddEscolaridadComponent } from './escolaridad/add-escolaridad/add-escolaridad.component';
import { GradoService } from "src/app/services/asociado/grado.service";
import { SociosComponent } from './socio/socios/socios.component';
import { AddSocioComponent } from './socio/add-socio/add-socio.component';
import { SocioService } from "src/app/services/asociado/socio.service";
import { NGXFormWizardModule } from "./socio/ngx-wizard/ngx-wizard.module";
import {MatTableModule} from '@angular/material/table'; 
import {MatPaginatorModule} from '@angular/material/paginator'; 
import {MatButtonModule,MatTooltipModule} from '@angular/material';

@NgModule({
    imports: [
        RouterModule.forChild(AsociadoRoutes), 
        CommonModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        NGXFormWizardModule,
        ToastrModule.forRoot(),
        MatTableModule,
        MatPaginatorModule,
        MatTooltipModule,
        MatButtonModule
    ],
    declarations: [
        // ToastrComponent,
        ProfesionesComponent,
        AddProfesionComponent,
        EscolaridadesComponent,
        AddEscolaridadComponent,
        SociosComponent,
        AddSocioComponent,
        // PersonalComponent,
        // FAddSocioComponent
    ],   //Componentes
    providers: [
        ProfesionService,
        GradoService,
        SocioService
    ]   //Servicios
})

export class AsociadoModule {}