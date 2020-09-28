import { Component, OnInit } from '@angular/core';
import { ProfesionService } from 'src/app/services/asociado/profesion.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-profesion',
  templateUrl: './add-profesion.component.html',
  styleUrls: ['./add-profesion.component.css']
})
export class AddProfesionComponent implements OnInit {
  profesionForm: FormGroup;
  cargando: boolean = true;
  nuevo: boolean = true;
  id: number;

  constructor(private fb: FormBuilder, private profesionService: ProfesionService, private activeModal: NgbActiveModal, private toastr: ToastrService) { }

  ngOnInit() {
    this.createFormProfesion();
    if (!this.nuevo) {
      this.showProfesion();
      this.profesionForm.get('id').setValue(this.id);
    }
    else
      this.cargando = false;
  }

  createFormProfesion() {
    this.profesionForm = this.fb.group({
      id: [null],
      profesion: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(40)]]
    });
  }

  addProfesion() {
    this.profesionService.addProfesion(this.profesionForm.value).subscribe((data: {}) => {
      this.toastr.success('Profesion guardado correctamento', 'Guardado');
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

  showProfesion() {
    this.profesionService.showProfesion(this.id).subscribe((data: {}) => {
      this.profesionForm.patchValue(data['data']);
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

  updateProfesion() {
    this.profesionService.updateprofesion(this.profesionForm.value).subscribe((data: {}) => {
      this.toastr.success('Profesion actualizada correctamente', 'Actualizado');
      this.activeModal.close();
    },
      (err: any) => {
        if (err.error.error) {
          this.toastr.error(err.error.error, 'No se pudo actualizar');
        }
        else
          this.toastr.error('Error en el servidor', 'No se pudo actualizar')
      });
  }

  validacionForm() {
    for (let c in this.profesionForm.controls) {
      this.profesionForm.controls[c].markAsTouched();
    }

    if (this.profesionForm.valid) {
      if (this.nuevo) {
        this.addProfesion();
      }
      else
        this.updateProfesion();
    }
    else
      this.toastr.error('Uno de los campos es invalido', 'Error');
  }
}
