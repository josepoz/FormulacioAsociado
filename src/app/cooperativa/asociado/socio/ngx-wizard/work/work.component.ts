import { Component, OnInit, ɵConsole } from '@angular/core';

import { FormDataService } from '../data/formData.service';
import { WorkflowService } from "../workflow/workflow.service";
import { STEPS } from "../workflow/workflow.model";
import { Router, ActivatedRoute } from "@angular/router";
import { Empleo } from '../data/formData.model';

import { SectorService } from 'src/app/services/asociado/sector.service';
import { ToastrService } from 'ngx-toastr';
import { PaisService } from 'src/app/services/configuracion/pais.service';
import { MunicipioService } from 'src/app/services/configuracion/municipio.service';
import { DepartamentoService } from 'src/app/services/configuracion/departamento.service';
import { SocioService } from '../../../../../services/asociado/socio.service';


@Component({
    selector: 'mt-wizard-work',
    templateUrl: './work.component.html',
    styleUrls: ['./work.component.scss']
})

export class WorkComponent implements OnInit {
    title = 'Informacion Economica';


    sectores: any;
    paises: any;
    departamentos: any;
    municipios: any;
  
    empleo: Empleo;


    works: Empleo[]=[];

    tipoMonedas=[];
   
   

    constructor(private router: Router,
        private route: ActivatedRoute, 
        private formDataService: FormDataService,
        private workflowService: WorkflowService, 
        private sectorServices: SectorService, 
        private toastr: ToastrService, 
        private paisService: PaisService,
        private departamentoService: DepartamentoService, 
        private municipioService: MunicipioService, 
        private socioService: SocioService) {
    }

    ngOnInit() {
        this.works.push(this.formDataService.getWork());
        this.getSectores();
        this.getPaises();
        this.getTipoMonedas();
    }

    getTipoMonedas(){
      this.socioService.getTipoMonedas().subscribe((data:any)=>{
        this.tipoMonedas=data.data;
      });
    }
    

    getSectores()
    {
      this.sectorServices.getSectorFull().subscribe((data: any) => {
        this.sectores = data.data;
      }, (err: any) => {
        if (err.error.error) {
          this.toastr.error(err.error.error, 'No se pudo obtener la informacion');
        }
        else
          this.toastr.error('Error en el servidor', 'No se pudo consultar')
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



  addEmpleo() {
    this.works.push({
        id: null,
        sector_id: null,
        nombre_empleador: null,
        actividad_ec: null,
        puesto: null,
        direccion: null,
        pais_id: null,
        departamento_id: null,
        municipio_id: null,
        moneda_id: null,
        monto: null

    });
  }

  removeEmpleo(i: number){
    this.works.splice(i, 1);
  }



    //Save button event Starts
    save(form: any) {
        if (!form.valid) {
            return;
        }

        

        this.formDataService.setWork(this.works);

       
        let firstState = this.workflowService.getFirstInvalidStep(STEPS.work);       
        this.router.navigate(['negocio'], { relativeTo: this.route.parent, skipLocationChange: true });
    }
    //Save button event Ends

    //Cancel button event Starts
    cancel() {
        this.router.navigate(['wizard'], { relativeTo: this.route.parent, skipLocationChange: true });
    }
    //Cancel button event Ends
}