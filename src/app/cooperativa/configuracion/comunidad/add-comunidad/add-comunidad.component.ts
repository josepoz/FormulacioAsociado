import { Component, OnInit, Input } from '@angular/core';
import { ComunidadService } from 'src/app/services/configuracion/comunidad.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-comunidad',
  templateUrl: './add-comunidad.component.html',
  styleUrls: ['./add-comunidad.component.css']
})
export class AddComunidadComponent implements OnInit {
  cargando = true;
  comunidadForm: FormGroup;

  @Input() nuevo: boolean = true;
  @Input() pais_id: string = '';
  @Input() departamento_id: number;
  @Input() municipio_id: number;
  @Input() comunidad_id: number;

  constructor(private comunidadService: ComunidadService, private fb: FormBuilder, private activeModal: NgbActiveModal, 
    private toastr: ToastrService ) { }

  ngOnInit() {
    this.createFormComunidad();
    if(!this.nuevo)
    {
      this.showComunidad();
    }
    else
      this.cargando = false;
  }

  createFormComunidad()
  {
    this.comunidadForm = this.fb.group({
      id: [null],
      pais_id: [this.pais_id],
      departamento_id: [this.departamento_id],
      municipio_id: [this.municipio_id],
      codigo: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
      comunidad: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(25)]]
    });
  }

  addComunidad()
  {
    this.comunidadService.addComunidad(this.comunidadForm.value).subscribe((data: {}) => {
      this.toastr.success('Comunidad guardado correctamento', 'Guardado');
      this.activeModal.close();
    }, (err: any) => {
      if (err.error.error) {
        this.toastr.error(err.error.error, 'No se pudo guardar');
      }
      else
        this.toastr.error('Error en el servidor', 'No se pudo guardar')
    })
  }

  showComunidad()
  {
    this.comunidadService.showComunidad(this.comunidad_id).subscribe((data: {}) => {
      this.comunidadForm.patchValue(data['data']);
      this.cargando = false;
    }, (err: any) => {
      if (err.error.error) {
        this.toastr.error(err.error.error, 'No se pudo obtener la informacion');
      }
      else
        this.toastr.error('Error en el servidor', 'No se pudo consultar')
    })
  }

  updateComunidad()
  {
    this.comunidadService.updateComunidad(this.comunidadForm.value).subscribe((data: {}) => {
      this.toastr.success('Comunidad actualizada correctamente', 'Actualizado');
      this.activeModal.close();
    }, (err: any) => {
      if (err.error.error) {
        this.toastr.error(err.error.error, 'No se pudo guardar');
      }
      else
        this.toastr.error('Error en el servidor', 'No se pudo guardar')
    })
  }

  validacionForm() {
    for (let c in this.comunidadForm.controls) {
      this.comunidadForm.controls[c].markAsTouched();
    }

    if (this.comunidadForm.valid) {
      if(this.nuevo)
      {
        this.addComunidad();
      }
      else
        this.updateComunidad();
    }
    else
      this.toastr.error('Uno de los campos es invalido', 'Error');
  }
}
