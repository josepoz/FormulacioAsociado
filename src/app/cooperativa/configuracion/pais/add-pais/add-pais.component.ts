import { Component, OnInit, ViewChild, Input, Output, EventEmitter} from '@angular/core';
import { PaisService } from 'src/app/services/configuracion/pais.service';
import { FormBuilder, FormGroup, Validators, NgForm, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-pais',
  templateUrl: './add-pais.component.html',
  styleUrls: ['./add-pais.component.css']
})
export class AddPaisComponent implements OnInit {
  // @ViewChild('f', { static: true }) floatingLabelForm: NgForm;
  // @ViewChild('vform', { static: true }) validationForm: FormGroup;

  @Output() volver_paises = new EventEmitter(); 
  
  paisForm: FormGroup;
  cargando: boolean = true;

  @Input() public nuevo: boolean = true;
  @Input() public id: string = '';

  constructor(private fb: FormBuilder, private paisService: PaisService, private toastr: ToastrService, 
    private activeModal: NgbActiveModal, private router: Router) {
  }

  ngOnInit() {
    this.createFormPais();
    if (!this.nuevo) {
      this.showPais();
    }
    else
      this.cargando = false;
  }

  createFormPais() {
    this.paisForm = this.fb.group({
      id: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(3)]],
      pais: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      gentilicio: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(25)]]
    });
  }

  addPais() {
    this.paisService.addPais(this.paisForm.value).subscribe((data: {}) => {
      this.toastr.success('Pais guardado correctamente', 'Guardado');
      this.activeModal.close();
      this.volver();
    },
      (err: any) => {
        if (err.error.error) {
          this.toastr.error(err.error.error, 'No se pudo guardar');
        }
        else
          this.toastr.error('Error en el servidor', 'No se pudo guardar')
      }
    );
  }

  validacionForm() {
    for (let c in this.paisForm.controls) {
      this.paisForm.controls[c].markAsTouched();
    }

    if (this.paisForm.valid) {
      if(this.nuevo)
      {
        this.addPais();
      }
      else
        this.updatePais();
    }
    else
      this.toastr.error('Uno de los campos es invalido', 'Error');
  }


  showPais() {
    this.paisService.showPais(this.id).subscribe((data: {}) => {
      this.paisForm.patchValue(data['data']);
      this.cargando = false;
    },
      (err: any) => {
        if (err.error.error) {
          this.toastr.error(err.error.error, 'No se pudo obtener la informacion');
        }
        else
          this.toastr.error('Error en el servidor', 'No se pudo consultar')
      }
    );
  }

  updatePais() {
    this.paisService.updatePais(this.paisForm.value).subscribe((data: {}) => {
      this.toastr.success('Pais actualizado correctamente', 'Hecho');
      this.activeModal.close();
    },
      (err: any) => {
        if (err.error.error) {
          this.toastr.error(err.error.error, 'No se pudo actualizar');
        }
        else
          this.toastr.error('Error en el servidor', 'No se pudo actualizar')
      } 
    )
  }

  volver()
  {
    console.log('Se invoco a volver');
    this.volver_paises.emit();
  }
}
