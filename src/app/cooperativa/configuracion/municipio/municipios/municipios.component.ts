import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MunicipioService } from 'src/app/services/configuracion/municipio.service';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddMunicipioComponent } from '../add-municipio/add-municipio.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-municipios',
  templateUrl: './municipios.component.html',
  styleUrls: ['./municipios.component.css']
})
export class MunicipiosComponent implements OnInit {
  municipios: any;
  cargando: boolean = true;

  @Input() pais_id: number;             //Viene desde el padre
  @Input() departamento_id: number;     //Sera cargado desde el componente departamentos
  @Input() departamento: string;         //Se recibe de departamento component
  @Output() retorno =  new EventEmitter;

  //////////////////////////////////////Para manadar al hijo
  mostrando_comunidades: boolean = false;
  municipio_id: number;
  municipio: string = '';

  constructor(private municipioService: MunicipioService, private slimLoader: SlimLoadingBarService, 
    private toastr: ToastrService, private modalService: NgbModal) { }

  ngOnInit() {
    this.getMunicipios();
  }


  getMunicipios()
  {
    this.slimLoader.start();
    this.municipioService.getMunicipios(this.departamento_id).subscribe((data: {}) => {
      this.municipios = data['data'];
      this.cargando = false;
      this.slimLoader.complete();
    }, (err: any) => {
      if (err.error.error) {
        this.toastr.error(err.error.error, 'No se pudo obtener la informacion');
      }
      else
        this.toastr.error('Error en el servidor', 'No se pudo consultar')
    })
  }

  volver()
  {
    this.retorno.emit();
  }

  open(municipio_id?)
  {
    const modalRef = this.modalService.open(AddMunicipioComponent);
    modalRef.componentInstance.pais_id = this.pais_id;
    modalRef.componentInstance.departamento_id = this.departamento_id;
    if(municipio_id != null)
    {
      modalRef.componentInstance.nuevo = false;
      modalRef.componentInstance.municipio_id = municipio_id;
    }

    modalRef.result.then((result) => {
      this.getMunicipios();
    }, (reason) => {
      console.log('Se ha cerrado el modal');
    });
  }


  deleteMunicipio(municipio_id, municipio)
  {
    Swal.fire({
      title: 'Esta seguro de borrar: '+municipio,
      text: "No se podra revertir",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.municipioService.deleteMunicipio(municipio_id).subscribe((data: {}) => {
          Swal.fire(
            'Borrado!',
            'Dejo de existir: '+municipio,
            'success'
          )
          this.getMunicipios()
          },
          (err: any) => {
            if (err.error.error) {
              this.toastr.error(err.error.error, 'No se pudo borrar');
            }
            else
              this.toastr.error('Error en el servidor', 'No se pudo borrar')
          }
          );
      }
    })
  }

  goComunidades(municipio_id, municipio)
  {
    this.cargando = true;
    this.mostrando_comunidades = true;
    this.municipio_id = municipio_id;
    this.municipio = municipio;
  }

  showMunicipios()
  {
    this.cargando = false;
    this.mostrando_comunidades = false;
    this.getMunicipios();
  }
}
