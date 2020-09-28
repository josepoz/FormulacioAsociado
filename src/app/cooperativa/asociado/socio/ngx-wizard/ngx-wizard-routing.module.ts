import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NGXFormWizardComponent } from "./ngx-wizard.component";
import { PersonalComponent }  from './personal/personal.component';
import { WorkComponent }      from './work/work.component';
import { ResultComponent }    from './result/result.component';
import { NegocioComponent } from './negocio/negocio.component';

const routes: Routes = [
  {
    path: '',
     component: NGXFormWizardComponent,
    data: {
      title: 'ngx-wizard'
    },
    children: [
      {
        path: 'wizard',
        component: PersonalComponent,
        data: {
          title: 'Personal'
        }
      },
      {
        path: 'work',
        component: WorkComponent,        
        data: {
          title: 'Work'
        }
      },  
      {
        path: 'negocio',
        component: NegocioComponent,
        data: {
          title: 'negocio'
        }
      },  
      {
        path: 'result',
        component: ResultComponent,
        data: {
          title: 'Result'
        }
      }      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NGXWizardRoutingModule { }

export const routedComponents = [NGXFormWizardComponent];
