import { Component, OnInit, Output } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SocioService } from 'src/app/services/asociado/socio.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-buscarsocio',
  templateUrl: './buscarsocio.component.html',
  styleUrls: ['./buscarsocio.component.css']
})
export class BuscarsocioComponent implements OnInit {
  socio_select: number = 0;

  searchForm: FormGroup;
  socios: any = [];
  
  constructor(private modal:NgbModal, private socioService: SocioService, private fb: FormBuilder, private toastr: ToastrService,
    public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.createForm();
    this.searchSocio();
  }

  createForm()
  {
    this.searchForm  = this.fb.group({
      nombre_1: [null],
      nombre_2: [null],
      nombre_3: [null],
      apellido_1: [null],
      apellido_2: [null],
      apellido_casado: [null],
      numero_identificacion: [null]
    })
  }

  searchSocio()
  {
    this.socioService.searchSocio(this.searchForm.value).subscribe((data: {}) => {
      this.socios = data['data'];
    }, (err: any) => {
      if (err.error.error) {
        this.toastr.error(err.error.error, 'No se pudo obtener la informacion');
      }
      else
        this.toastr.error('Error en el servidor', 'No se pudo consultar');
    })
  }
  

  retorno(item)
  {
    this.socio_select = item;
    this.activeModal.close(this.socio_select);
  }
}
