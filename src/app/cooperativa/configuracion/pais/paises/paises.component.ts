import { Component, OnInit, Input } from '@angular/core';
import { PaisService } from 'src/app/services/configuracion/pais.service';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddPaisComponent } from '../add-pais/add-pais.component';
import Swal from 'sweetalert2'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-paises',
  templateUrl: './paises.component.html',
  styleUrls: ['./paises.component.css']
})
export class PaisesComponent implements OnInit {
  paises: any = [];
  cargando: boolean = true;
  tablePaises: boolean = true;
  selectId: string = '';

  
  constructor(private slimLoader: SlimLoadingBarService, private paisService: PaisService, private toastr: ToastrService, private modalService: NgbModal) { 
  }

  ngOnInit() {
    this.getPaises();
  }
  
  getPaises()
  {
    this.slimLoader.start();
    this.paisService.getPaises().subscribe((data: {}) =>{
      this.paises = data['data'];
      this.cargando = false;
      this.slimLoader.complete();
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


  open(id?) 
  {
    const modalRef = this.modalService.open(AddPaisComponent);

    if(id!=null)
    {
      modalRef.componentInstance.id = id;
      modalRef.componentInstance.nuevo = false;
    }
    modalRef.result.then((result) => {
      this.getPaises();
    }, (reason) => {
      console.log('Modal cerrado');
    });
  }

  deletePais(id)
  {
    Swal.fire({
      title: 'Esta seguro de borrar: '+id,
      text: "No se podra revertir",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.paisService.deletePais(id).subscribe((data: {}) => {
          Swal.fire(
            'Borrado!',
            'Dejo de existir: '+id,
            'success'
          )
          this.getPaises();
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
  
  showDep(pais_id)
  {
    // debugger;
    if(!this.cargando)
    {
      this.selectId = pais_id
      this.cargando = true;   //Para que se oculte la table de paises
      this.tablePaises = false;
    }
  }

  showPais()    //Este metodo vuelve a cargar los paises despues de que se retorna de despartamentos
  {
    this.tablePaises = true;
    this.cargando = true;
    this.getPaises();
  }
}
