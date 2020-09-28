import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { SocioService } from 'src/app/services/asociado/socio.service';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-socios',
  templateUrl: './socios.component.html',
  styleUrls: ['./socios.component.css']
})
export class SociosComponent implements OnInit {


  displayedColumns: string[] = ['id','nombre_completo', 'opciones'];

  socios: any = [];
  selected_tour: any;

  // Paginacion
  public currentPage = 1;
  public length = 0;
  public pageSize = 5;
  public sortBy = 'id';
  public sortOrder = 'asc';

  // Busqueda
  public filterQuery = '';
  public searchTimeout: any;


  constructor(private socioService: SocioService, 
    private slimLoader: SlimLoadingBarService,
     private toastr: ToastrService) { 

     
     }

  ngOnInit() {
    this.getSocios();
  }


  getSocios(busqueda ?: any, reset ?: boolean) {
    // Guardamos la pagina actual
    let page = this.currentPage;

    // Si debemos volver a la primer pagina
    if (reset) {
      page = 1;
    }

    // Filtros del destino
    const filtro = {
      page: page,
      many: this.pageSize,
      sort_by: this.sortBy,
      direction: this.sortOrder,
      ...busqueda
    };

    this.socioService.getSociosFiltro(filtro).subscribe((datos) => {

      this.socios = new MatTableDataSource < any > (datos.data.data);
      this.length = datos.data.total;
      if (reset) {
        this.currentPage = 1;
      }
    }, (err: any) => {
      if (err.error.error) {
        this.toastr.error(err.error.error, 'No se pudo obtener la informacion');
      }
      else
        this.toastr.error('Error en el servidor', 'No se pudo consultar')
    });
  }

    // Cambio de pagina y de cantidad de elementos por pagina
    cambioPagina(event) {
      this.currentPage = event.pageIndex + 1;
      this.pageSize = event.pageSize;

      if (this.filterQuery !== '') {
        this.getSocios({
          nombre: this.filterQuery
        });
      } else {
        this.getSocios();
      }
    }

    verDetalleSocio(socio_id){

    }

    eliminarSocio(socio_id, indice) {
      this.socioService.deleteSocio(socio_id).subscribe((respuesta:any) => {
       
        if(respuesta.data){
        this.getSocios();
       }
      });
    }


}
