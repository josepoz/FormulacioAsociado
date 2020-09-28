import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ComunidadService } from 'src/app/services/configuracion/comunidad.service';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AddComunidadComponent } from '../add-comunidad/add-comunidad.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-comunidades',
  templateUrl: './comunidades.component.html',
  styleUrls: ['./comunidades.component.css']
})
export class ComunidadesComponent implements OnInit {
  comunidades: any;
  cargando: boolean = true;

  ///////Se recibe del componente municipios
  @Input() pais_id: string;             //Viene desde el padre
  @Input() departamento_id: number;
  @Input() municipio_id: number;
  @Input() municipio: string;
  @Output() retorno =  new EventEmitter;


  ///para maandar al hijo
  comunidad_id: number;

  constructor(private comunidadService: ComunidadService, private slimLoader: SlimLoadingBarService, 
    private toastr: ToastrService, private modalService: NgbModal) { }

  ngOnInit() {
    this.getComunindades();
    // console.log(this.pais_id);
    // console.log(this.departamento_id);
    // console.log(this.municipio_id);
    // console.log(this.municipio);
  }

  getComunindades()
  {
    this.slimLoader.start();
    this.comunidadService.getComunidades(this.municipio_id).subscribe((data: {}) => {
      this.comunidades = data['data'];
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

  open(comunidad_id?)
  {
    const modalRef = this.modalService.open(AddComunidadComponent);
    modalRef.componentInstance.pais_id = this.pais_id;
    modalRef.componentInstance.departamento_id = this.departamento_id;
    modalRef.componentInstance.municipio_id = this.municipio_id;
    if(comunidad_id != null){
      modalRef.componentInstance.nuevo = false;
      modalRef.componentInstance.comunidad_id = comunidad_id;
    }

    modalRef.result.then((result) => {
      this.getComunindades();
    }, (reason) => {
      console.log('Se ha cerrado el modal');
    });

  }

  deleteComunidad(id, comunidad)
  {
    Swal.fire({
      title: 'Esta seguro de borrar: '+comunidad,
      text: "No se podra revertir",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.comunidadService.deleteComunidad(id).subscribe((data: {}) => {
          Swal.fire(
            'Borrado!',
            'Dejo de existir: '+comunidad,
            'success'
          )
          this.getComunindades();
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

  volver()
  {
    this.retorno.emit();
  }
}
