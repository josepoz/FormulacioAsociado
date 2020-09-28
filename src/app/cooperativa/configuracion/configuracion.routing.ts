import { Routes } from "@angular/router";
// import { path } from "d3";
import { LoginGuard } from "../login/guards/login.guard";
import { AgenciasComponent } from "./agencia/agencias/agencias.component";
import { AddAgenciaComponent } from "./agencia/add-agencia/add-agencia.component";
import { PaisesComponent } from "./pais/paises/paises.component";
import { AddPaisComponent } from "./pais/add-pais/add-pais.component";
import { AdddepartamentoComponent } from "./departamento/adddepartamento/adddepartamento.component";
import { AddMunicipioComponent } from "./municipio/add-municipio/add-municipio.component";
import { AddComunidadComponent } from "./comunidad/add-comunidad/add-comunidad.component";

export const ConfiguracionRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'agencias', canActivate: [LoginGuard],
                component: AgenciasComponent,
                data: {
                    title: 'Sistema',
                    url: [
                        { title: 'SC - Administracion', url: '/agencias' },
                        { title: 'Ag' }
                    ]
                },
                children: [
                    {
                        path: 'nuevo', canActivate: [LoginGuard],
                        component: AddAgenciaComponent,
                        data: {
                            url: [
                                { title: 'SC - Administracion - nuevo', url: '/nuevo'}
                            ]
                        }
                    }
                ]
            },
            {
                path: 'demografia', canActivate: [LoginGuard],
                component: PaisesComponent,
                data: {
                    title: 'Sistema',
                    url: [
                        { title: 'SC - Administracion', url: '/demografia' },
                        { title: 'Ag' }
                    ]
                },
                children: [
                    {
                        path: 'nuevo', canActivate: [LoginGuard],
                        component: AddPaisComponent,
                        data: {
                            url: [
                                { title: 'SC - Administracion - nuevo', url: '/nuevo'}
                            ]
                        }
                    },
                    {
                        path: 'nuevodepto', canActivate: [LoginGuard],
                        component: AdddepartamentoComponent,
                        data: {
                            url: [
                                { title: 'SC - Administracion - nuevo', url: '/nuevodepto'}
                            ]
                        }
                    },
                    {
                        path: 'nuevomuni', canActivate: [LoginGuard],
                        component: AddMunicipioComponent,
                        data: {
                            url: [
                                { title: 'SC - Administracion - nuevo', url: '/nuevomuni'}
                            ]
                        }
                    },
                    {
                        path: 'nuevacom', canActivate: [LoginGuard],
                        component: AddComunidadComponent,
                        data: {
                            url: [
                                { title: 'SC - Administracion - nuevo', url: '/nuevavom'}
                            ]
                        }
                    }
                ]
            }
            // {
            //     path: 'agencias', canActivate: [LoginGuard],
            //     component: AddAgenciaComponent,
            //     data: {
            //         title: 'Administracion',
            //         url: [
            //             { title: 'Agencias', url: '/agencias' },
            //             { title: 'Ag' }
            //         ]
            //     }
            // }
        ]
    }
];
