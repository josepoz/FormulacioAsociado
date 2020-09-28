import { Component, OnInit } from '@angular/core';
import { ProfesionService } from 'src/app/services/asociado/profesion.service';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AddProfesionComponent } from '../add-profesion/add-profesion.component';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-profesiones',
  templateUrl: './profesiones.component.html',
  styleUrls: ['./profesiones.component.css']
})
export class ProfesionesComponent implements OnInit {
  profesiones: any = [];
  cargando: boolean = true;

  constructor(private profesionService: ProfesionService, private slimLoader: SlimLoadingBarService,
    private toastr: ToastrService, private modalService: NgbModal) { }

  ngOnInit() {
    this.getProfesiones();
  }

  getProfesiones() {
    this.slimLoader.start();
    this.profesionService.getProfesiones().subscribe((data: {}) => {
      this.profesiones = data['data'];
      this.slimLoader.complete();
      this.cargando = false;
    },
      (err: any) => {
        if (err.error.error) {
          this.toastr.error(err.error.error, 'No se pudo obtener la informacion');
        }
        else
          this.toastr.error('Error en el servidor', 'No se pudo consultar')
      }
    )
  }

  deleteProfesion(id, profesion)
  {
    Swal.fire({
      title: 'Esta seguro de borrar: '+profesion,
      text: "No se podra revertir",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.profesionService.deleteProfesion(id).subscribe((data: {}) => {
          Swal.fire(
            'Borrado!',
            'Dejo de existir: '+profesion,
            'success'
          )
          this.getProfesiones();
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

  openModal(id?)
  {
    const modalRef = this.modalService.open(AddProfesionComponent);
    if(id != null)
    {
      modalRef.componentInstance.nuevo = false;
      modalRef.componentInstance.id = id;
    }
    modalRef.result.then((result) => {
      this.getProfesiones()
    },(reason) => {
      console.log('Se cerro inesperadamente el modal');
    });
  }
}
