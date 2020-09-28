import { Routes } from "@angular/router";
import { LoginGuard } from "../login/guards/login.guard";
import { ProfesionesComponent } from "./profesion/profesiones/profesiones.component";
import { AddProfesionComponent } from "./profesion/add-profesion/add-profesion.component";
import { EscolaridadesComponent } from "./escolaridad/escolaridades/escolaridades.component";
import { AddEscolaridadComponent } from "./escolaridad/add-escolaridad/add-escolaridad.component";
import { SociosComponent } from "./socio/socios/socios.component";

export const AsociadoRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'socios', canActivate: [LoginGuard],
                component: SociosComponent,
                data: {
                    title: 'Sistema',
                    url: [
                        { title: 'SC - Asociado', url: '/socios' },
                        { title: 'Socios' }
                    ]
                },
            },
            {
                path: 'form',
                loadChildren: () => import('./socio/ngx-wizard/ngx-wizard.module').then(m => m.NGXFormWizardModule)
            },
            {
                path: 'profesiones', canActivate: [LoginGuard],
                component: ProfesionesComponent,
                data: {
                    title: 'Sistema',
                    url: [
                        { title: 'SC - Asociado', url: '/profesiones' },
                        { title: 'Profesiones' }
                    ]
                },
                children: [
                    {
                        path: 'nuevo', canActivate: [LoginGuard],
                        component: AddProfesionComponent,
                        data: {
                            url: [
                                { title: 'SC - Profesion - nuevo', url: '/nuevo' }
                            ]
                        }
                    }
                ]
            },
            {
                path: 'escolaridades', canActivate: [LoginGuard],
                component: EscolaridadesComponent,
                data: {
                    title: 'Sistema',
                    url: [
                        { title: 'SC - Asociado', url: '/escolaridades' },
                        { title: 'Escolaridades' }
                    ]
                },
                children: [
                    {
                        path: 'nuevo', canActivate: [LoginGuard],
                        component: AddEscolaridadComponent,
                        data: {
                            url: [
                                { title: 'SC - Escolaridad - nuevo', url: '/nuevo' }
                            ]
                        }
                    }
                ]
            }
        ]
    }
];