import { Component, OnInit } from '@angular/core';
import { GradoService } from 'src/app/services/asociado/grado.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-escolaridad',
  templateUrl: './add-escolaridad.component.html',
  styleUrls: ['./add-escolaridad.component.css']
})
export class AddEscolaridadComponent implements OnInit {
  escolaridadForm: FormGroup;
  cargando: boolean = true;
  nuevo: boolean = true;
  id: number;

  constructor(private fb:FormBuilder,  private gradoService: GradoService, private activeModal: NgbActiveModal, private toastr: ToastrService) { }

  ngOnInit() {
    this.createFormEscolaridad()
    if (!this.nuevo) {
      this.showEscolaridad();
      this.escolaridadForm.get('id').setValue(this.id);
    }
    else
      this.cargando = false;
  }

  createFormEscolaridad()
  {
    this.escolaridadForm = this.fb.group({
      id: [null],
      grado: [null, [Validators.required, Validators.min(3), Validators.max(40)]]
    });
  }

  addEscolaridad()
  {
    this.gradoService.addGrado(this.escolaridadForm.value).subscribe((data: {}) => {
      this.toastr.success('Escolaridad guardado correctamento', 'Guardado');
      this.activeModal.close();
    },
    (err: any) => {
      if (err.error.error) {
        this.toastr.error(err.error.error, 'No se pudo guardar');
      }
      else
        this.toastr.error('Error en el servidor', 'No se pudo guardar')
      });
  }

  showEscolaridad() {
    this.gradoService.showGrado(this.id).subscribe((data: {}) => {
      this.escolaridadForm.patchValue(data['data']);
      this.cargando = false;
    },
      (err: any) => {
        if (err.error.error) {
          this.toastr.error(err.error.error, 'No se pudo obtener la informacion');
        }
        else
          this.toastr.error('Error en el servidor', 'No se pudo consultar')
      });
  }

  updateEscolaridad()
  {
    this.gradoService.updateGrado(this.escolaridadForm.value).subscribe((data: {}) => {
      this.toastr.success('Escolaridad actualizada correctamente', 'Actualizado');
      this.activeModal.close();
    },
    (err: any) => {
      if (err.error.error) {
        this.toastr.error(err.error.error, 'No se pudo guardar');
      }
      else
        this.toastr.error('Error en el servidor', 'No se pudo guardar')
    });
  }

  validacionForm() {
    for (let c in this.escolaridadForm.controls) {
      this.escolaridadForm.controls[c].markAsTouched();
    }

    if (this.escolaridadForm.valid) {
      if (this.nuevo) {
        this.addEscolaridad();
      }
      else
        this.updateEscolaridad();
    }
    else
      this.toastr.error('Uno de los campos es invalido', 'Error');
  }
}
