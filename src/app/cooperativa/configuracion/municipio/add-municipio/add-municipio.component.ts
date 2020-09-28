import { Component, OnInit, Input } from '@angular/core';
import { MunicipioService } from 'src/app/services/configuracion/municipio.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-municipio',
  templateUrl: './add-municipio.component.html',
  styleUrls: ['./add-municipio.component.css']
})
export class AddMunicipioComponent implements OnInit {
  cargando = true;
  municipioForm: FormGroup;
  @Input() nuevo: boolean = true;
  @Input() pais_id: string = '';
  @Input() departamento_id: number =0;
  @Input() municipio_id: number;

  constructor(private municipioService: MunicipioService, private fb: FormBuilder, private activeModal: NgbActiveModal, private toastr: ToastrService) { }

  ngOnInit() {
    this.createFormMunicipio();
    if(!this.nuevo)
    {
      this.showMuncipio();
    }
    else
      this.cargando = false;
  }

  createFormMunicipio()
  {
    this.municipioForm = this.fb.group({
      id: [null],
      pais_id: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(4)]],
      departamento_id: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      codigo: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      municipio: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(25)]]
    });

    this.municipioForm.get('pais_id').setValue(this.pais_id);
    this.municipioForm.get('departamento_id').setValue(this.departamento_id);
  }
  
  addMunicipio()
  {
    this.municipioService.addMunicipio(this.municipioForm.value).subscribe((data: {}) => {
      this.toastr.success('Municipio guardado correctamente', 'Guardado');
      this.activeModal.close();
    }, (err: any) => {
      if (err.error.error) {
        this.toastr.error(err.error.error, 'No se pudo guardar');
      }
      else
        this.toastr.error('Error en el servidor', 'No se pudo guardar')
    });
  }

  validacionForm() {
    for (let c in this.municipioForm.controls) {
      this.municipioForm.controls[c].markAsTouched();
    }

    if (this.municipioForm.valid) {
      if(this.nuevo)
      {
        this.addMunicipio();
      }
      else
        this.updateMunicipio();
    }
    else
      this.toastr.error('Uno de los campos es invalido', 'Error');
  }

  showMuncipio()
  {
    this.municipioService.showMunicipio(this.municipio_id).subscribe((data: {}) => {
      this.municipioForm.patchValue(data['data']);
      this.cargando = false;
    }, (err: any) => {
      if (err.error.error) {
        this.toastr.error(err.error.error, 'No se pudo obtener la informacion');
      }
      else
        this.toastr.error('Error en el servidor', 'No se pudo consultar')
    })
  }
  
  updateMunicipio()
  {
    this.municipioService.updateMunicipio(this.municipioForm.value).subscribe((data: {}) => {
      this.toastr.success('Municipio actualizado correctamente', 'Actualizado')
      this.activeModal.close();
    }, (err: any) => {
      if (err.error.error) {
        this.toastr.error(err.error.error, 'No se pudo guardar');
      }
      else
        this.toastr.error('Error en el servidor', 'No se pudo guardar')
    });
  }
}
