import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ConfiguracionRoutes } from "./configuracion.routing";
import { CommonModule } from "@angular/common";
import { AgenciasComponent } from "./agencia/agencias/agencias.component";
import { AgenciaService } from "src/app/services/configuracion/agencia.service";
import { AddAgenciaComponent } from "./agencia/add-agencia/add-agencia.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { PaisService } from "src/app/services/configuracion/pais.service";
import { DepartamentoService } from "src/app/services/configuracion/departamento.service";
import { MunicipioService } from "src/app/services/configuracion/municipio.service";
import { PaisesComponent } from "./pais/paises/paises.component";
import { AddPaisComponent } from './pais/add-pais/add-pais.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ToastrModule } from "ngx-toastr";
// import { ToastrComponent } from "src/app/extra-component/toastr/toastr.component";
import { DepartamentosComponent } from './departamento/departamentos/departamentos.component';
import { AdddepartamentoComponent } from './departamento/adddepartamento/adddepartamento.component';
import { MunicipiosComponent } from './municipio/municipios/municipios.component';
import { AddMunicipioComponent } from './municipio/add-municipio/add-municipio.component';
import { ComunidadService } from "src/app/services/configuracion/comunidad.service";
import { ComunidadesComponent } from './comunidad/comunidades/comunidades.component';
import { AddComunidadComponent } from './comunidad/add-comunidad/add-comunidad.component';

@NgModule({
    imports: [
        RouterModule.forChild(ConfiguracionRoutes),
        CommonModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        ToastrModule.forRoot(),
    ],
    declarations: [
        // ToastrComponent,
        AgenciasComponent,
        AddAgenciaComponent,
        PaisesComponent,
        AddPaisComponent,
        DepartamentosComponent,
        AdddepartamentoComponent,
        MunicipiosComponent,
        AddMunicipioComponent,
        ComunidadesComponent,
        AddComunidadComponent,

    ],
    providers: [
        AgenciaService,
        PaisService,
        DepartamentoService,
        MunicipioService,
        ComunidadService
    ]
})

export class ConfiguracionModule {}