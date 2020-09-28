import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { DepartamentoService } from 'src/app/services/configuracion/departamento.service';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2'
import { AdddepartamentoComponent } from '../adddepartamento/adddepartamento.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { MunicipiosComponent } from '../../municipio/municipios/municipios.component';

@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.css']
})
export class DepartamentosComponent {
  @Input() pais_id: string;   //Se recibe el id del pais para que se consulten los departamento que corresponden a el
  @Output() volver_paises = new EventEmitter();  // Para regresar al componente de paises

  departamentos: any = [];
  cargando: boolean = true;

  ///////////Parametros para manejor del componente de municipios
  mostrando_muni: boolean = false;    //Bandera para mostrar u ocultar el componente de 
  departamento_id: number;            //Parametro a enviar
  departamento: string = ''           //Se enviara como parametro

  constructor(private departamentoService: DepartamentoService, private slimLoader: SlimLoadingBarService, 
    private toastr: ToastrService, private modalService: NgbModal) { }

  ngOnInit() {
    if(this.pais_id != '')
    {
      this.getDepartamentos();
    }
  }
  
  getDepartamentos()
  {
    this.slimLoader.start();
    this.departamentoService.getDepartamentos(this.pais_id).subscribe((data: {}) => {
      this.departamentos = data['data'];
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
    );
  }

  volver()
  {
    this.volver_paises.emit();
  }

  open(departamento_id?) {
    const modalRef = this.modalService.open(AdddepartamentoComponent);
    modalRef.componentInstance.pais_id = this.pais_id;

    if(departamento_id != null)
    {
      modalRef.componentInstance.nuevo = false;
      modalRef.componentInstance.id = departamento_id;
    }
    modalRef.result.then((result) => {
      this.getDepartamentos();
    }, (reason) => {
      console.log('Se ha cerrado el modal');
    });
  }

  deleteDepartamento(id, departamento)
  {
    Swal.fire({
      title: 'Esta seguro de borrar: '+departamento,
      text: "No se podra revertir",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.departamentoService.deleteDepartamento(id).subscribe((data: {}) => {
          Swal.fire(
            'Borrado!',
            'Dejo de existir: '+departamento,
            'success'
          )
          this.getDepartamentos()
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

  goMunicipios(departamento_id, departamento)   //Para abrir al componente que lista los municipios
  {
    this.cargando = true;
    this.mostrando_muni = true;
    this.departamento_id = departamento_id;
    this.departamento = departamento;
  }

  showDepartamentos()
  {
    this.cargando = false;
    this.mostrando_muni = false;
    this.getDepartamentos();
  }
}
