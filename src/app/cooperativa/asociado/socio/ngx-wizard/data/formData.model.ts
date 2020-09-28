//Wizard form data class Starts
export class FormData {
    // DATOS DE PRIMER BLOQUE / DATOS PERSONALES
    id: number = null;
    institucion_id: number = 1;
    actua: boolean = true;
    mancomunado: boolean = false;
    menor_edad: boolean = false;
    nombre_1: string = null;
    nombre_2: string = null;
    nombre_3: string = null;
    apellido_1: string = null;
    apellido_2: string = null;
    apellido_casado: string = null;
    nacionalidad_id: string = null;
    condicion_id: number = null;
    especifica_condicion: string = null;
    identificacion_id: number = null;
    numero_identificacion: string = null;
    e_pais_id: string = null;
    genero: string = null;
    estado: string = null; //Soltero casado
    profesion_id: number = null;
    grado_id: number = null;
    fecha_nacimiento: string = null;
    fecha_fallecimiento: string = null;
    lugar_nacimiento: string = null;
    n_pais_id: string = null;
    n_departamento_id: number = null;
    n_municipio_id: number = null;
    n_comunidad_id: number = null;
    direccion: string = null;
    d_pais_id: string = null;
    d_departamento_id: number = null;
    d_municipio_id: number = null;
    d_comunidad_id: number = null;
    etnia: string = null;
    nit: string = null;
    correo: string = null;
    telefono: string = null;
    celular1: string = null;
    celular2: string = null;


    mon_ing_id: number = null;
    mon_eg_id: number = null;

    ingreso_mensual: number = null;
    egreso_mensual: number = null;

    espep: boolean = false;
    escpe: boolean = false;
    
    rev_user_id: number = 1;
    aut_user_id: number = 1;
    empleos: Array<Empleo>;
    negocios: Array<Negocio>;
    otrosIngresos: Array<otrosIngreso>;

    clear() {
        // this.primerNombre = '',
        this.id = null;
        this.institucion_id = 1;
        this.actua = true;
        this.mancomunado = false;
        this.menor_edad = false;
        this.nombre_1 = null;
        this.nombre_2 = null;
        this.nombre_3 = null;
        this.apellido_1 = null;
        this.apellido_2 = null;
        this.apellido_casado = null;
        this.nacionalidad_id = null;
        this.condicion_id = null;
        this.especifica_condicion = null;
        this.identificacion_id = null;
        this.numero_identificacion = null;
        this.e_pais_id = null;
        this.genero = null;
        this.estado = null; //Soltero casado
        this.profesion_id = null;
        this.grado_id = null;
        this.fecha_nacimiento = null;
        this.fecha_fallecimiento = null;
        this.lugar_nacimiento = null;
        this.n_pais_id = null;
        this.n_departamento_id = null;
        this.n_municipio_id = null;
        this.n_comunidad_id = null;
        this.direccion = null;
        this.d_pais_id = null;
        this.d_departamento_id = null;
        this.d_municipio_id = null;
        this.d_comunidad_id = null;
        this.etnia = null;
        this.nit = null;
        this.correo = null;
        this.telefono = null;
        this.celular1 = null;
        this.celular2 = null;

    
        this.mon_ing_id= null;
        this.mon_eg_id = null;

        this.ingreso_mensual= null;
        this.egreso_mensual= null;


        this.espep = false;
        this.escpe = false;

        this.rev_user_id = 1;
        this.aut_user_id = 1;
        this.empleos = [];
        this.negocios = [];
        this.otrosIngresos = [];
    }
}
//Wizard form data class Ends

//Personal tab data class starts
export class Personal {
    
    id?: number = null;
    institucion_id: number = 1;
    actua: boolean = true;
    mancomunado: boolean = false;
    menor_edad: boolean = false;
    nombre_1: string = null;
    nombre_2: string = null;
    nombre_3: string = null;
    apellido_1: string = null;
    apellido_2: string = null;
    apellido_casado: string = null;
    nacionalidad_id: string = null;
    condicion_id: number = null;
    especifica_condicion: string = null;
    identificacion_id: number = null;
    numero_identificacion: string = null;
    e_pais_id: string = null;
    genero: string = null;
    estado: string = null; //Soltero casado
    profesion_id: number = null;
    grado_id: number = null;
    fecha_nacimiento: string = null;
    fecha_fallecimiento: string = null;
    lugar_nacimiento: string = null;
    n_pais_id: string = null;
    n_departamento_id: number = null;
    n_municipio_id: number = null;
    n_comunidad_id: number = null;
    direccion: string = null;
    d_pais_id: string = null;
    d_departamento_id: number = null;
    d_municipio_id: number = null;
    d_comunidad_id: number = null;
    etnia: string = null;
    nit: string = null;
    correo: string = null;
    telefono: string = null;
    celular1: string = null;
    celular2: string = null;



    mon_ing_id: number = null;
    mon_eg_id: number = null;

    ingreso_mensual: number = null;
    egreso_mensual: number = null;



    espep: boolean = false;
    escpe: boolean = false;
    //
    rev_user_id: number = 1;
    aut_user_id: number = 1;

}
//Personal tab data class ends

//Datos del empleo
export class Empleo {
    id?: number = null;
    sector_id: number = null;
    nombre_empleador: string = null;
    actividad_ec: string = null;
    puesto: string = null;
    direccion: string = null;
    pais_id: string = null;
    departamento_id: number = null;
    municipio_id: number = null;
    moneda_id: string = null;
    monto: number = null;
}

//Address tab data class starts
export class Negocio {
    id: number = null;
    nombre_comercial: string = null;
    principal_actividad_ec: string = null;
    fecha_inscripcion: string =null;
    numero_registro: string = null;
    folio: string = null;
    libro: string = null;
    direccion: string = null;
    pais_id: string = null;
    departamento_id: string = null;
    municipio_id: string = null;
    moneda_id: string = null;
    monto: number = null;
    telefono: string = null;
    nit: string = null;

    
}

export class otrosIngreso{
    id?: number = null;
    tipo_ingreso_id: number =null;
    detalle: string =  null;
    moneda_id: string = null;
    monto: number = null;

}
//Address tab data class Ends


