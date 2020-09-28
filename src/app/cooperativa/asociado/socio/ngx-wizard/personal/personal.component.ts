import { Component, OnInit } from '@angular/core';

import { Personal } from '../data/formData.model';
import { FormDataService } from '../data/formData.service';
import { WorkflowService } from "../workflow/workflow.service";
import { STEPS } from "../workflow/workflow.model";
import { Router, ActivatedRoute } from "@angular/router";
import { CondicionmService } from 'src/app/services/asociado/condicionm.service';
import { ToastrService } from 'ngx-toastr';
import { PaisService } from 'src/app/services/configuracion/pais.service';
import { DepartamentoService } from 'src/app/services/configuracion/departamento.service';
import { MunicipioService } from 'src/app/services/configuracion/municipio.service';
import { ComunidadService } from 'src/app/services/configuracion/comunidad.service';
import { ProfesionService } from 'src/app/services/asociado/profesion.service';
import { GradoService } from 'src/app/services/asociado/grado.service';
import { IdentificacionService } from 'src/app/services/asociado/identificacion.service';
import { SocioService } from 'src/app/services/asociado/socio.service';

@Component({
    selector: 'mt-wizard-personal',
    templateUrl: './personal.component.html',
    styleUrls: ['./personal.component.scss']
})

export class PersonalComponent implements OnInit {
    title = 'Datos Personales';
    personal: Personal;
    form: any;

    condiciones: any;
    identificaciones: any;
    profesiones: any;
    grados: any;
    paises: any;
    departamentos: any;
    municipios: any;
    comunidades: any;

    d_departamentos: any;
    d_municipios: any;
    d_comunidades: any;

    constructor(private router: Router,
        private route: ActivatedRoute, private formDataService: FormDataService, private condicionService: CondicionmService,
        private toastr: ToastrService, private workflowService: WorkflowService, private paisService: PaisService,
        private departamentoService: DepartamentoService, private municipioService: MunicipioService, private comunidadService: ComunidadService,
        private profesionService: ProfesionService, private gradoService: GradoService, private identificacionService: IdentificacionService,
        private socioService: SocioService) {
    }

    ngOnInit() {
        this.personal = this.formDataService.getPersonal();
        this.getCondiciones();
        this.getIdentificaciones();
        this.getPaises();
        this.getProfesiones();
        this.getGrados();
    }

    getPaises() {
        this.paisService.getPaises().subscribe((data: {}) => {
            this.paises = data['data'];
        }, (err: any) => {
            if (err.error.error) {
                this.toastr.error(err.error.error, 'No se pudo obtener la informacion de Pais');
            }
            else
                this.toastr.error('Error en el servidor', 'No se pudo consultar')
        });
    }

    getDepartamentos() {
        if (this.personal.n_pais_id != null) {
            this.departamentoService.getDepartamentosFull(this.personal.n_pais_id).subscribe((data: {}) => {
                this.departamentos = data;
            }, (err: any) => {
                if (err.error.error) {
                    this.toastr.error(err.error.error, 'No se pudo obtener la informacion de Departamento');
                }
                else
                    this.toastr.error('Error en el servidor', 'No se pudo consultar')
            });
        }
    }

    getMunicipios() {
        if (this.personal.n_departamento_id != 0) {
            this.municipioService.getMunicipiosFull(this.personal.n_departamento_id).subscribe((data: {}) => {
                this.municipios = data;
            }, (err: any) => {
                if (err.error.error) {
                    this.toastr.error(err.error.error, 'No se pudo obtener la informacion de Municipio');
                }
                else
                    this.toastr.error('Error en el servidor', 'No se pudo consultar')
            });
        }
    }

    getComunidades() {
        if (this.personal.n_municipio_id != 0) {
            this.comunidadService.getComunidadesFull(this.personal.n_municipio_id).subscribe((data: {}) => {
                this.comunidades = data;
            }, (err: any) => {
                if (err.error.error) {
                    this.toastr.error(err.error.error, 'No se pudo obtener la informacion de Comunidad');
                }
                else
                    this.toastr.error('Error en el servidor', 'No se pudo consultar')
            });
        }
    }
    // 
    get_d_Departamentos() {
        if (this.personal.d_pais_id != null) {
            this.departamentoService.getDepartamentosFull(this.personal.d_pais_id).subscribe((data: {}) => {
                this.d_departamentos = data;
            }, (err: any) => {
                if (err.error.error) {
                    this.toastr.error(err.error.error, 'No se pudo obtener la informacion de Departamento');
                }
                else
                    this.toastr.error('Error en el servidor', 'No se pudo consultar')
            });
        }
    }

    get_d_Municipios() {
        if (this.personal.d_departamento_id != 0) {
            this.municipioService.getMunicipiosFull(this.personal.d_departamento_id).subscribe((data: {}) => {
                this.d_municipios = data;
            }, (err: any) => {
                if (err.error.error) {
                    this.toastr.error(err.error.error, 'No se pudo obtener la informacion de Municipio');
                }
                else
                    this.toastr.error('Error en el servidor', 'No se pudo consultar')
            });
        }
    }

    get_d_Comunidades() {
        if (this.personal.d_municipio_id != 0) {
            this.comunidadService.getComunidadesFull(this.personal.d_municipio_id).subscribe((data: {}) => {
                this.d_comunidades = data;
            }, (err: any) => {
                if (err.error.error) {
                    this.toastr.error(err.error.error, 'No se pudo obtener la informacion de Comunidad');
                }
                else
                    this.toastr.error('Error en el servidor', 'No se pudo consultar')
            });
        }
    }
    // 
    getProfesiones() {
        this.profesionService.getProfesionesFull().subscribe((data: {}) => {
            this.profesiones = data;
        }, (err: any) => {
            if (err.error.error) {
                this.toastr.error(err.error.error, 'No se pudo obtener la informacion de Profesion');
            }
            else
                this.toastr.error('Error en el servidor', 'No se pudo consultar')
        });
    }

    getGrados() {
        this.gradoService.getGradosFull().subscribe((data: {}) => {
            this.grados = data;
        }, (err: any) => {
            if (err.error.error) {
                this.toastr.error(err.error.error, 'No se pudo obtener la informacion de Grado');
            }
            else
                this.toastr.error('Error en el servidor', 'No se pudo consultar')
        });
    }

    getIdentificaciones() {
        this.identificacionService.getIdetificaionesFull().subscribe((data: {}) => {
            this.identificaciones = data['data'];
        }, (err: any) => {
            if (err.error.error) {
                this.toastr.error(err.error.error, 'No se pudo obtener la informacion de Identificacion');
            }
            else
                this.toastr.error('Error en el servidor', 'No se pudo consultar')
        })
    }

    getCondiciones() {
        this.condicionService.getCondicionesFull().subscribe((data: {}) => {
            this.condiciones = data;
        }, (err: any) => {
            if (err.error.error) {
                this.toastr.error(err.error.error, 'No se pudo obtener la informacion de Condicion');
            }
            else
                this.toastr.error('Error en el servidor', 'No se pudo consultar')
        });
    }
    //Save button event Starts
    save(form: any) {
        this.addSocio();
        if (!form.valid)
            return;

        this.formDataService.setPersonal(this.personal);

        let firstState = this.workflowService.getFirstInvalidStep(STEPS.work);
        if (firstState.length > 0) {
        };
        this.router.navigateByUrl('/aso/form/work', { relativeTo: this.route.parent, skipLocationChange: true });
    }
    //Save button event Ends

    tmp()
    {
        this.formDataService.setPersonal(this.personal);
        this.router.navigateByUrl('/aso/form/work', { relativeTo: this.route.parent, skipLocationChange: true });
    }

    addSocio()
    {
        this.socioService.addSocio(this.personal).subscribe((data: any) => {
            console.log('Se guardo corr');
        }, (err: any) => {
            if (err.error.error) {
                this.toastr.error(err.error.error, 'No se pudo guardar');
              }
              else
                this.toastr.error('Error en el servidor', 'No se pudo guardar')
        });
    }
}
