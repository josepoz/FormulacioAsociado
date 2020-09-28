import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DepartamentoService } from 'src/app/services/configuracion/departamento.service';
import { PaisService } from 'src/app/services/configuracion/pais.service';
import { MunicipioService } from 'src/app/services/configuracion/municipio.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AgenciaService } from 'src/app/services/configuracion/agencia.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-agencia',
  templateUrl: './add-agencia.component.html',
  styleUrls: ['./add-agencia.component.css']
})
export class AddAgenciaComponent implements OnInit {
  agenciaForm: FormGroup;
  cargando: boolean = true;

  @Input() nuevo: boolean;
  @Input() agencia_id: number;

  paises: any;
  departamentos: any;
  municipios: any;

  @Output() retorno = new EventEmitter;

  constructor(private agenciaService: AgenciaService, private departamentoService: DepartamentoService,
    private paisService: PaisService, private municipioService: MunicipioService, private fb: FormBuilder, private toastr: ToastrService) { }

  ngOnInit() {
    if (!this.nuevo) {
      this.showAgencia();
    }
    else {
      this.cargando = false;
      this.getPaises();
    }
    this.createFormAgencia();
  }

  createFormAgencia() {
    this.agenciaForm = this.fb.group({
      id: [null],
      pais_id: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      institucion: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(120)]],//
      razon_social: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],//
      departamento_id: [null, Validators.required],
      municipio_id: [null, Validators.required],
      direccion: [null, [Validators.required, Validators.minLength(5), Validators.max(50)]],//
      nombre_agencia: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],//
      codigo_agencia: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],//
      codigo_ive: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      telefono: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(12)]]//
    })
  }

  addAgencia() {
    this.agenciaService.addAgencia(this.agenciaForm.value).subscribe((data: {}) => {
      this.toastr.success('Agencia guardada correctamente', 'Guardado');
      this.volver();
    }, (err: any) => {
      if (err.error.error) {
        this.toastr.error(err.error.error, 'No se pudo guardar');
      }
      else
        this.toastr.error('Error en el servidor', 'No se pudo guardar')
    })
  }

  showAgencia() {
    this.agenciaService.showAgencia(this.agencia_id).subscribe((data: {}) => {
      this.agenciaForm.patchValue(data['data']);
      this.getPaises();
    }, (err: any) => {
      if (err.error.error) {
        this.toastr.error(err.error.error, 'No se pudo obtener la informacion');
      }
      else
        this.toastr.error('Error en el servidor', 'No se pudo consultar')
    })
  }

  updateAgencia() {
    this.agenciaService.updateAgencia(this.agenciaForm.value).subscribe((data: {}) => {
      this.toastr.success('Agencia actualizada correctamente', 'Actualizado');
      this.volver();
    }, (err: any) => {
      if (err.error.error) {
        this.toastr.error(err.error.error, 'No se pudo guardar');
      }
      else
        this.toastr.error('Error en el servidor', 'No se pudo guardar')
    })
  }

  validacionForm() {
    for (let c in this.agenciaForm.controls) {
      this.agenciaForm.controls[c].markAsTouched();
    }

    if (this.agenciaForm.valid) {
      if (this.nuevo) {
        this.addAgencia();
      }
      else
        this.updateAgencia();
    }
    else
      this.toastr.error('Uno de los campos es invalido', 'Error');
  }

  getPaises() {
    this.paisService.getPaises().subscribe((data: {}) => {
      this.paises = data['data'];
      if(!this.nuevo)
      {
        this.cargando = false;
        this.getDepartamentos();
      }
    },
      (err: any) => {
        if (err.error.error) {
          this.toastr.error(err.error.error, 'No se pudo obtener la informacion');
        }
        else
          this.toastr.error('Error en el servidor', 'No se pudo consultar');
      }
    );
  }

  getDepartamentos() {
    if (this.agenciaForm.value.pais_id != null) {
      this.departamentoService.getDepartamentosFull(this.agenciaForm.value.pais_id).subscribe((data: {}) => {
        this.departamentos = data;
        if(!this.nuevo)
        {
          this.getMunicipios();
        }
      }, (err: any) => {
        if (err.error.error) {
          this.toastr.error(err.error.error, 'No se pudo obtener la informacion');
        }
        else
          this.toastr.error('Error en el servidor', 'No se pudo consultar');
      });
    }
  }

  getMunicipios() {
    if (this.agenciaForm.value.departamento_id != null) {
      this.municipioService.getMunicipiosFull(this.agenciaForm.value.departamento_id).subscribe((data: {}) => {
        this.municipios = data;
        // this.cargando = false;
      }, (err: any) => {
        if (err.error.error) {
          this.toastr.error(err.error.error, 'No se pudo obtener la informacion');
        }
        else
          this.toastr.error('Error en el servidor', 'No se pudo consultar');
      });
    }
  }



  volver() {
    this.retorno.emit();
    this.agencia_id = null;
    this.nuevo = true;
    this.cargando = true;
    this.agenciaForm.reset();
  }
}
