import { Component, OnInit, Input }   from '@angular/core';
import { FormData, otrosIngreso } from '../data/formData.model';
import { FormDataService } from '../data/formData.service';
import { SocioService } from '../../../../../services/asociado/socio.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
@Component ({
    selector:     'mt-wizard-result',
    templateUrl: './result.component.html',
    styleUrls: ['./result.component.scss']
})

export class ResultComponent implements OnInit {
    title = 'Ingresos extra!';
    @Input() formData: FormData;
    isFormValid: boolean = false;

    ingresos: otrosIngreso[]=[];

    tipoIngresos=[];
    tipoMonedas=[];
    
    constructor(
      private formDataService: FormDataService, 
      private socioService: SocioService,
      private toastr: ToastrService,
      private router: Router) {
    }

    ngOnInit() {
        this.formData = this.formDataService.getFormData();
       
        this.ingresos.push(this.formDataService.getOtrosIngreso());
        this.getTipoIngresos();
        this. getTipoMonedas();
       
    }

    getTipoIngresos(){
      this.socioService.getTipoIngresos().subscribe((data:any)=>{
        this.tipoIngresos=data.data;
      });
    }

    getTipoMonedas(){
      this.socioService.getTipoMonedas().subscribe((data:any)=>{
        this.tipoMonedas=data.data;
      });
    }
    
    
      addIngreso() {
        this.ingresos.push({
          id: null,
          tipo_ingreso_id: null,
          detalle: null,
          moneda_id: null,
          monto: null
        });
      }
    
      removeIngreso(i: number){
        this.ingresos.splice(i, 1);
      }
    

    //Submit button event Starts
    guardarSocio(form) {

      if (!form.valid){
        return;
      }

      this.formDataService.setOtrosIngreso(this.ingresos);

      this.isFormValid = this.formDataService.isFormValid();
/*
      if (this.isFormValid) {
        return
      }
      */

        this.isFormValid = false;

        this.socioService.createSocio(this.formData).subscribe((respuesta:any)=>{
 

          if(respuesta){
            this.toastr.success('se almaceno correctamente');
            this.router.navigate(['/aso/socios']);
          }
        }, (error:any) =>{
             console.log(error)
        });

        

    }
    //Submit button event Ends
}
