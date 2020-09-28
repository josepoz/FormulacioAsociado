import { Component, OnInit } from '@angular/core';
import { AgenciaService } from 'src/app/services/configuracion/agencia.service';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
// import { Router } from '@angular/router';

@Component({
  selector: 'app-agencias',
  templateUrl: './agencias.component.html',
  styleUrls: ['./agencias.component.css']
})
export class AgenciasComponent implements OnInit {
  agencias: any = [];
  cargando: boolean = true;
  // private sub: any;

  viewFormAgencia: boolean = false;
  agencia_id: number;
  nuevo: boolean = true;

  constructor(private slimLoader: SlimLoadingBarService, private agenciaService: AgenciaService, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.getAgencias();
  }

  getAgencias() {
    this.slimLoader.start();
    this.agencias = [];
    this.agenciaService.getAgencia().subscribe((data: {}) => {
      this.agencias = data['data'];
      this.slimLoader.complete();
      this.cargando = false;
    }, (err: any) => {
      if (err.error.error) {
        this.toastr.error(err.error.error, 'No se pudo consultar');
      }
      else
        this.toastr.error('Error en el servidor', 'No se pudo obtener')
    })
  }

  open(id?) {
    // debugger;
    this.cargando = true;
    if(id != null)
    {
      this.nuevo = false;
      this.agencia_id = id;
    }
    else
    {
      this.nuevo = true;
      this.agencia_id = null;  
    }
    this.viewFormAgencia = true;
  }

  showAgencias()
  {
    this.cargando = false;
    this.getAgencias();
    this.viewFormAgencia = false;
    
  }

  deleteAgencia(id, agencia)
  {
    Swal.fire({
      title: 'Esta seguro de borrar: '+agencia,
      text: "No se podra revertir",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.agenciaService.deleteAgencia(id).subscribe((data: {}) => {
          Swal.fire(
            'Borrado!',
            'Dejo de existir: '+agencia,
            'success'
          )
          this.getAgencias();
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
}
