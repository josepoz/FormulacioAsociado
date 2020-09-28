import { Component, OnInit } from '@angular/core';
import { GradoService } from 'src/app/services/asociado/grado.service';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddEscolaridadComponent } from '../add-escolaridad/add-escolaridad.component';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-escolaridades',
  templateUrl: './escolaridades.component.html',
  styleUrls: ['./escolaridades.component.css']
})
export class EscolaridadesComponent implements OnInit {
  grados: any = [];
  cargando: boolean = true;

  constructor(private gradoService: GradoService, private slimLoader: SlimLoadingBarService, private toastr: ToastrService,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.getGrados();
  }

  getGrados()
  {
    this.slimLoader.start();
    this.gradoService.getGrados().subscribe((data: {}) => {
      this.grados = data['data'];
      this.slimLoader.complete();
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

  deleteGrado(id, grado)
  {
    Swal.fire({
      title: 'Esta seguro de borrar: '+grado,
      text: "No se podra revertir",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.gradoService.deleteGrado(id).subscribe((data: {}) => {
          Swal.fire(
            'Borrado!',
            'Dejo de existir: '+grado,
            'success'
          )
          this.getGrados();
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
    const modalRef  = this.modalService.open(AddEscolaridadComponent);
    if(id != null)
    {
      modalRef.componentInstance.nuevo = false;
      modalRef.componentInstance.id = id;
    }
    modalRef.result.then((result) => {
      this.getGrados();
    },(reason) => {
      console.log('Se cerro inesperadamente el modal');
    });
  }
}
