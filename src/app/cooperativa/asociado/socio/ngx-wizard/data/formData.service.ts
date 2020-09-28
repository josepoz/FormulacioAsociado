import { Injectable } from '@angular/core';

import { FormData, Personal, Empleo, Negocio, otrosIngreso } from './formData.model';
import { WorkflowService } from '../workflow/workflow.service';
import { STEPS } from '../workflow/workflow.model';
import { id } from '@swimlane/ngx-charts/release/utils';

@Injectable()
export class FormDataService {

    private formData: FormData = new FormData();
    private isPersonalFormValid: boolean = false;
    private isWorkFormValid: boolean = false;
    private isNegocioFormValid: boolean = false;

    constructor(private workflowService: WorkflowService) {
    }
    //Get Personal Tab Data
    getPersonal(): Personal {
        // Return the Personal data
        var personal: Personal = {
            // primerNombre: this.formData.primerNombre,
            id: this.formData.id,
            institucion_id: this.formData.institucion_id,
            actua: this.formData.actua, 
            mancomunado: this.formData.mancomunado,
            menor_edad: this.formData.menor_edad,
            nombre_1: this.formData.nombre_1, 
            nombre_2: this.formData.nombre_2, 
            nombre_3: this.formData.nombre_3, 
            apellido_1: this.formData.apellido_1, 
            apellido_2: this.formData.apellido_2, 
            apellido_casado: this.formData.apellido_casado, 
            nacionalidad_id: this.formData.nacionalidad_id, 
            condicion_id: this.formData.condicion_id,
            especifica_condicion: this.formData.especifica_condicion,
            identificacion_id: this.formData.identificacion_id, 
            numero_identificacion: this.formData.numero_identificacion, 
            e_pais_id: this.formData.e_pais_id, 
            genero: this.formData.genero, 
            estado: this.formData.estado,  //Soltero casado
            profesion_id: this.formData.profesion_id, 
            grado_id: this.formData.grado_id, 
            fecha_nacimiento: this.formData.fecha_nacimiento, 
            fecha_fallecimiento: this.formData.fecha_fallecimiento, 
            lugar_nacimiento: this.formData.lugar_nacimiento, 
            n_pais_id: this.formData.n_pais_id, 
            n_departamento_id: this.formData.n_departamento_id, 
            n_municipio_id: this.formData.n_municipio_id, 
            n_comunidad_id: this.formData.n_comunidad_id, 
            direccion: this.formData.direccion, 
            d_pais_id: this.formData.d_pais_id, 
            d_departamento_id: this.formData.d_departamento_id, 
            d_municipio_id: this.formData.d_municipio_id, 
            d_comunidad_id: this.formData.d_comunidad_id, 
            etnia: this.formData.etnia, 
            nit: this.formData.nit, 
            correo: this.formData.correo, 
            telefono: this.formData.telefono, 
            celular1: this.formData.celular1, 
            celular2: this.formData.celular2, 

            mon_ing_id: this.formData.mon_eg_id,
            mon_eg_id: this.formData.mon_eg_id,
        
        
            ingreso_mensual: this.formData.ingreso_mensual,
            egreso_mensual: this.formData.egreso_mensual,

            espep: this.formData.espep, 
            escpe: this.formData.escpe, 
            rev_user_id: this.formData.rev_user_id,
            aut_user_id: this.formData.aut_user_id,
        };
        return personal;
    }

    //Set Personal Tab Data
    setPersonal(data: Personal) {
        // Update the Personal data only when the Personal Form had been validated successfully
        this.isPersonalFormValid = true;
        this.formData.id = data.id,
        this.formData.institucion_id = data.institucion_id,
        this.formData.actua = data.actua, 
        this.formData.mancomunado = data.mancomunado,
        this.formData.menor_edad = data.menor_edad,
        this.formData.nombre_1 = data.nombre_1, 
        this.formData.nombre_2 = data.nombre_2, 
        this.formData.nombre_3 = data.nombre_3, 
        this.formData.apellido_1 = data.apellido_1, 
        this.formData.apellido_2 = data.apellido_2, 
        this.formData.apellido_casado = data.apellido_casado, 
        this.formData.nacionalidad_id = data.nacionalidad_id, 
        this.formData.condicion_id = data.condicion_id,
        this.formData.especifica_condicion = data.especifica_condicion,
        this.formData.identificacion_id = data.identificacion_id, 
        this.formData.numero_identificacion = data.numero_identificacion, 
        this.formData.e_pais_id = data.e_pais_id, 
        this.formData.genero = data.genero, 
        this.formData.estado = data.estado,  //Soltero casado
        this.formData.profesion_id = data.profesion_id, 
        this.formData.grado_id = data.grado_id, 
        this.formData.fecha_nacimiento = data.fecha_nacimiento, 
        this.formData.fecha_fallecimiento = data.fecha_nacimiento, 
        this.formData.lugar_nacimiento = data.lugar_nacimiento, 
        this.formData.n_pais_id = data.n_pais_id, 
        this.formData.n_departamento_id = data.n_departamento_id, 
        this.formData.n_municipio_id = data.n_municipio_id, 
        this.formData.n_comunidad_id = data.n_comunidad_id, 
        this.formData.direccion = data.direccion, 
        this.formData.d_pais_id = data.d_pais_id, 
        this.formData.d_departamento_id = data.d_departamento_id, 
        this.formData.d_municipio_id = data.d_municipio_id, 
        this.formData.d_comunidad_id = data.d_comunidad_id, 
        this.formData.etnia = data.etnia, 
        this.formData.nit = data.nit, 
        this.formData.correo = data.correo, 
        this.formData.telefono = data.telefono, 
        this.formData.celular1 = data.celular1, 
        this.formData.celular2 = data.celular2, 


        this.formData.mon_ing_id = data.mon_ing_id,
        this.formData.mon_eg_id = data.mon_eg_id,

        this.formData.ingreso_mensual = data.ingreso_mensual,

        this.formData.espep = data.espep, 
        this.formData.escpe = data.escpe, 
        //
        this.formData.rev_user_id = data.rev_user_id,
        this.formData.aut_user_id = data.aut_user_id,
        this.workflowService.validateStep(STEPS.personal);
    }

    getWork(): any {

        var empleo: Empleo = {
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
        }



        this.formData.empleos = new Array<Empleo>();

        return empleo;
    }

    getLengtWoks() {
        return this.formData.empleos;
    }

    setWork(data: Empleo[]) {
        this.isWorkFormValid = true;

        data.map((work)=>{
            this.formData.empleos.push(work)
        })
        
        this.workflowService.validateStep(STEPS.work);
    }


    getNegocio(): any {

        var negocio: Negocio = {
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
        }

        this.formData.negocios = new Array<Negocio>();

        return negocio;
    }
    
    
    setNegocio(data: Negocio[]) {
    
        this.isWorkFormValid = true;

        data.map((negocio)=>{
            this.formData.negocios.push(negocio)
        })
        

        this.workflowService.validateStep(STEPS.negocio);
    }


  
    getOtrosIngreso(): any {

        var otroIngreso: otrosIngreso = {
            id: null,
            tipo_ingreso_id:null,
            detalle: null,
            moneda_id:null,
            monto:null,
        }

        this.formData.otrosIngresos = new Array<otrosIngreso>();

        return otroIngreso;
    }
    
    
    setOtrosIngreso(data: otrosIngreso[]) {
    
        this.isWorkFormValid = true;

        data.map((otros)=>{
            this.formData.otrosIngresos.push(otros)
        })
        
        this.workflowService.validateStep(STEPS.negocio);
    }


    getFormData(): FormData {
        // Return the entire Form Data
        return this.formData;
    }


    resetFormData(): FormData {
        this.workflowService.resetSteps();
   
        this.formData.clear();
        this.isPersonalFormValid = this.isWorkFormValid = this.isNegocioFormValid = false;
        return this.formData;
    }

    isFormValid() {
        return this.isPersonalFormValid &&
            this.isWorkFormValid &&
            this.isNegocioFormValid;
    }


}