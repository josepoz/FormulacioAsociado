import { Component, OnInit } from '@angular/core';

import { Negocio } from '../data/formData.model';
import { FormDataService } from '../data/formData.service';
import { WorkflowService } from "../workflow/workflow.service";
import { STEPS } from "../workflow/workflow.model";
import { Router, ActivatedRoute } from "@angular/router";
import { PaisService } from 'src/app/services/configuracion/pais.service';
import { MunicipioService } from 'src/app/services/configuracion/municipio.service';
import { DepartamentoService } from 'src/app/services/configuracion/departamento.service';
import { ToastrService } from 'ngx-toastr';
import { SocioService } from '../../../../../services/asociado/socio.service';

@Component({
  selector: 'app-negocio',
  templateUrl: './negocio.component.html',
  styleUrls: ['./negocio.component.css']
})
export class NegocioComponent implements OnInit {
  title = 'Informacion de negocios';

  form: any;

  tipoMonedas=[];

  negocio: Negocio;

  negocios: Negocio[]=[];

  paises: any;
  departamentos: any;
  municipios: any;



  constructor(private router: Router,
      private route: ActivatedRoute, 
      private formDataService: FormDataService,
      private workflowService: WorkflowService,
      private paisService: PaisService,
      private toastr: ToastrService,
      private departamentoService: DepartamentoService, 
      private municipioService: MunicipioService,
      private socioService: SocioService) {
  }

  ngOnInit() {
      this.negocios.push(this.formDataService.getNegocio());
      this.getPaises();
      this.getTipoMonedas();

  }

  getTipoMonedas(){
    this.socioService.getTipoMonedas().subscribe((data:any)=>{
      this.tipoMonedas=data.data;
    });
  }
  

  getPaises() {
    this.paisService.getPaises().subscribe((data: any) => {
        this.paises = data['data'].data;
    }, (err: any) => {
        if (err.error.error) {
            this.toastr.error(err.error.error, 'No se pudo obtener la informacion de Pais');
        }
        else
            this.toastr.error('Error en el servidor', 'No se pudo consultar')
    });
}

getDepartamentos(pais_id) { 
  this.departamentoService.getDepartamentosFull(pais_id).subscribe((data: any) => {
      this.departamentos = data.data;
  }, (err: any) => {
      if (err.error.error) {
          this.toastr.error(err.error.error, 'No se pudo obtener la informacion de Departamento');
      }
      else
          this.toastr.error('Error en el servidor', 'No se pudo consultar')
  });

}

getMunicipios(departamento_id) {
  this.municipioService.getMunicipiosFull(departamento_id).subscribe((data: any) => {
      this.municipios = data.data;
  }, (err: any) => {
      if (err.error.error) {
          this.toastr.error(err.error.error, 'No se pudo obtener la informacion de Municipio');
      }
      else
          this.toastr.error('Error en el servidor', 'No se pudo consultar')
  });
    
}

  addNegocio() {
    this.negocios.push({
      id: null,
      nombre_comercial: null,
      principal_actividad_ec: null,
      fecha_inscripcion:null,
      numero_registro: null,
      folio: null,
      libro: null,
      direccion: null,
      pais_id: null,
      departamento_id: null,
      municipio_id: null,
      moneda_id: null,
      monto: null,
      telefono: null,
      nit: null,
    });
  }

  removeNegocio(i: number){
    this.negocios.splice(i, 1);
  }


  //Save button event Starts
  save(form: any) {
      if (!form.valid){
        return;
      }
          

      this.formDataService.setNegocio(this.negocios);
      let firstState = this.workflowService.getFirstInvalidStep(STEPS.work);
      this.router.navigate(['result'], { relativeTo: this.route.parent, skipLocationChange: true });
  }
  //Save button event Ends

  //Cancel button event Starts
  cancel() {
      this.router.navigate(['work'], { relativeTo: this.route.parent, skipLocationChange: true });
  }
  //Cancel button event Ends

}
