import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DepartamentoService } from 'src/app/services/configuracion/departamento.service';

@Component({
  selector: 'app-adddepartamento',
  templateUrl: './adddepartamento.component.html',
  styleUrls: ['./adddepartamento.component.css']
})
export class AdddepartamentoComponent implements OnInit {
  @Input() public pais_id: string = '';
  @Input() public id: string = '';    //Id del departamento
  @Input() public nuevo:boolean = true;

  cargando: boolean = true;

  departamentoForm: FormGroup;
  
  constructor(private fb: FormBuilder, private activeModal: NgbActiveModal, private toastr: ToastrService, private departamentoService: DepartamentoService) { }

  ngOnInit() {
    this.createFormDepartamento();
    if(!this.nuevo)
    {
      this.showDepartamento();
    }
    else
      this.cargando = false;
  }

  createFormDepartamento()
  {
    this.departamentoForm = this.fb.group({
      id: [null],
      pais_id: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(4)]],
      codigo: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      departamento: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(25)]]
    });

    this.departamentoForm.get('pais_id').setValue(this.pais_id);
  }

  addDepartamento()
  {
    this.departamentoService.addDepartamento(this.departamentoForm.value).subscribe((data: {}) => {
      this.toastr.success('Departamento guardado correctamente', 'Guardado');
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
    for (let c in this.departamentoForm.controls) {
      this.departamentoForm.controls[c].markAsTouched();
    }

    if (this.departamentoForm.valid) {
      if(this.nuevo)
      {
        this.addDepartamento();
      }
      else
        this.updateDepartamento();
        // console.log('Para el update');
    }
    else
      this.toastr.error('Uno de los campos es invalido', 'Error');
  }


  cerrar()
  {
    this.activeModal.close();
  }

  showDepartamento()
  {
    this.departamentoService.showDepartamento(this.id).subscribe((data: {}) => {
      this.departamentoForm.patchValue(data['data']);
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
 
  updateDepartamento()
  {
    this.departamentoService.updateDepartamento(this.departamentoForm.value).subscribe((data: {}) => {
      this.toastr.success('Departamento actualizaro correctamente', 'Actualizado');
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
}
