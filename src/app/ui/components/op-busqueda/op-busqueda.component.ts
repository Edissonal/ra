import { ChangeDetectorRef, Component, ElementRef, Injectable, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '../../../domain/services/users.service';
import { Router } from '@angular/router';
import { AlertsService } from '../../../domain/services/alerts.service';

import { FormsService } from 'src/app/domain/services/forms.service';
import { TasksService } from 'src/app/domain/services/tasks.service';
import { Observable, Subscriber, takeWhile } from 'rxjs';
import { NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';


const FILTER_PAG_REGEX = /[^0-9]/g;

@Component({
  selector: 'app-op-busqueda',
  templateUrl: './op-busqueda.component.html',
  styleUrls: ['./op-busqueda.component.scss']
})
export class OpBusquedaComponent implements OnInit {

  //@ViewChild('anima',{static: false} ) anima: any;
  @ViewChild('anima', { read: ElementRef, static:false }) anima: any;
  @ViewChild('tarjeta', { read: ElementRef, static:false }) tarjeta: any;
  //formaForm!:FormGroup;
  fechaini!: NgbDateStruct;
  fechafi!:  NgbDateStruct ;
  items:any[]=[];
  itemsPen:any[]=[];
  vista:boolean =false;
  messageError:string='';
  //primer listado
  /*page = 1;
  pageSize = 4;*/
  filtros:any;
  estados=false;
  alerta:string='';
  cambios :boolean=false;
  prueba:number= 1;

  busquedasForm: FormGroup = this.fb.group({
    solicitud:  [null, [Validators.required,Validators.min(99999),Validators.max(999999999)]],
    filtros: [],
    fechai: [ null,  [Validators.required]],
    fechafi: [ null,  [Validators.required]],
  }/*,{validators:[this.forms.solicitudes('solicitud')]}*/)


  constructor(private fb:FormBuilder,
              private user:UsersService,
              private router:Router,
              private alert:AlertsService,
              private forms:FormsService,
              private changeDetector: ChangeDetectorRef,
              private taks:TasksService
              ) { 
  
                this.tareasPendientes();
                this.TareasEstado();

  }
  

  ngOnInit(): void {
    console.log(this.items);
    this.onchanges();
    this.vista = this.user.elementos;
   //validacion de pa las solicituides asignadas
 this.user.datos = this.taks.interval$
    .subscribe(  {
        next: (res: any) => { 
      console.log(this.items.length);
      if(this.items.length < 10){
        this.tareasPendientes();
      }
     },
     error: (error) => {
       console.log('error en el subscriber validaciones de tareas');
     }

    });

  // setTimeout(()=>   this.user.datos.unsubscribe(), 2000);
  }

  animaListas(){


    this.tarjeta.nativeElement.classList.add('animate__animated','animate__fadeIn');

    setTimeout(() => {
      this.tarjeta.nativeElement.classList.remove('animate__animated','animate__fadeIn');
    }, 500);
  }
  rotaElemento(){

       const element = document.querySelector('#circulo');
             element!.classList.add('fa-spin');
  
  }

  cambiarFlag(){
    this.estados = !this.estados;

  }

  /*validaciones de detecsion de cambios*/
  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }
  
    /*implementacion de consumo de tareas  asignadas al pull*/
    tareasPendientes(){

      console.log('se ejecuto tareas pendientes');
      //envio e parametros para listar targetas
      let mensajes =10;
      let fecha = new Date();
      console.log(fecha);
      let {user}=JSON.parse(localStorage.getItem('usuario')!);

      this.taks.cargaTareas(1,user,mensajes,fecha)
        .subscribe(  {
           next: (res: any) => {
           this.items = res;
        },
        error: (error) => {
          console.log('error en el subscriber cargar tareas');
        }
      })
    }

    /*implementacion de carga de pendientes o rechazado*/
    TareasEstado(){
      this.taks.cargaPendientes()
      .subscribe(  {
         next: (res: any) => {
      this.itemsPen= res;
      },
      error: (error) => {
        console.log('error en el subscriber cargar pendientes');
      }
    })
    }
    

/* funcion para validacion de campos*/
camposvalidos(campo:any){
  return this.busquedasForm.controls[campo].errors && this.busquedasForm.controls[campo].touched;
}

/*validacion de campos  de fecha*/

fechas(dato:any){
   
 // let fechai = this.busquedasForm.controls['fechai'].invalid;
//^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/
// let valida = new RegExp("((?:19|20)[0-9][0-9])-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])");
 //console.log(dato);
 //console.log(this.busquedasForm);
 let valida =/^(?:(?:(?:0?[1-9]|1\d|2[0-8])[/-](?:0?[1-9]|1[0-2])|(?:29|30)[/-](?:0?[13-9]|1[0-2])|31[/](?:0?[13578]|1[02]))[/-](?:0{2,3}[1-9]|0{1,2}[1-9]\d|0?[1-9]\d{2}|[1-9]\d{3})|29[/-]0?2[/-](?:\d{1,2}(?:0[48]|[2468][048]|[13579][26])|(?:0?[48]|[13579][26]|[2468][048])00))$/;
 let errores: boolean = false;
 console.log(valida.test(dato));
 
 if (valida.test(dato) == false) {
  this.forms.eventos("alerta");
  this.messageError = "Formato de fecha inválido";
 }
 else{
  this.messageError = "";
}

}

  
  //ecuchado de eventos de formulario
  onchanges(){
  this.busquedasForm.valueChanges.subscribe(valores =>{

  console.log(this.busquedasForm.status);
    const valora = this.busquedasForm.get('fechai')?.value;
    const valorb = this.busquedasForm.get('fechafi')?.value;
    let fechaa=      this.busquedasForm.controls['fechai'].value;  
    let fechab=      this.busquedasForm.controls['fechafi'].value;  
    let soli=      this.busquedasForm.controls['solicitud'].value; 
    
    console.log(this.fechaini);
    console.log(this.fechafi);
     
     if(!fechaa || (typeof fechaa === 'string' && fechaa.length == 0)) {
     // console.log("CAMBIO ", fechaa);
      this.busquedasForm.patchValue({
        fechai: null
      }, {emitEvent: false});
    }

    if(!fechab || (typeof fechab === 'string' && fechab.length == 0)) {
      //console.log("CAMBIO ", fechab);
      this.busquedasForm.patchValue({
        fechafi: null
      }, {emitEvent: false});
    }
    if(!soli || (typeof soli === 'string' && soli.length == 0)) {
    //  console.log("CAMBIO ", soli);
      this.busquedasForm.patchValue({
        solicitud: null
      }, {emitEvent: false});
    }

  /*let fechai = `${valora?.year}-${valora?.month}-${valora?.day}`;
    let fechab = `${valorb?.year}-${valorb?.month}-${valorb?.day}`;*/
    
     let fecha = new Date();
     let valida = new Date(fechaa);
     let validb = new Date(fechab);
     fecha.setMonth(fecha.getMonth() +1);
     //filtro
     console.log(valida);

     


    /*  if(valida > fecha){
    this.messageError ='fecha selecionada mayor a la fecha actual';
    this.forms.eventos("alerta");
      } else{
        this.messageError ='';
      }

     if(validb > fecha){
        this.messageError ='fecha selecionada mayor a la fecha actual';
        this.forms.eventos("alerta");
          }
*/

    console.log(this.busquedasForm.value);
  if(valores.filtros == "Asignacion"){

    const result = this.items.filter(s => s.status.includes('Asignacion'));
    console.log(result);
    this.items = [];
    this.items = result;
  } else if(valores.filtros == "Revocacion"){
    const result = this.items.filter(s => s.status.includes('Revocacion'));
    console.log(result);
    this.items = [];
    this.items = result;
  }

  },error => {
    console.log(error);
  })
  }

  //funcion del paginador
  /*selectPage(page: string) {
		this.page = parseInt(page, 10) || 1;
	}
  */

    //funcion del paginador
  formatInput(input: HTMLInputElement) {
		input.value = input.value.replace(FILTER_PAG_REGEX, '');
	}


  /*validacion de campos*/
  caracTeres(datos: any) {
    this.forms.noPuntoComa(datos)
      .subscribe(  {
         next: (res: any) => {
        // this.palabra2 = res;
        this.busquedasForm.controls['solicitud'].setValue(res);
      },
      error: (error) => {
        console.log('error en el subscriber');
      }
    })
  }

  
  //buscar elementos de consulta
  // se reliza depuracion de validators dado a que los campos no dependen uno de otro
  buscar(){

    let  solicitud = this.busquedasForm.controls['solicitud'].value;
    let fechai = this.busquedasForm.controls['fechai'].value;
    let fechaf = this.busquedasForm.controls['fechafi'].value;

   //validacion de la palabra y demas vacios
    if(solicitud !== null && fechai === null  && fechaf === null  ){
       //quietar validators
       this.restaBlecerControls();
     console.log('entro');


  let codigo = this.busquedasForm.controls["solicitud"].value;
   console.log(codigo);


   this.taks.filtrarSolicitudes(codigo)
   .subscribe(  {
     next: (res: any) => {
       
      console.log(res);
       if(res.length == 0 ){
         this.messageError ='Solicitud no encontrada';
         this.forms.eventos("alerta");
       }
       else if(res.length > 0 ){
         let [data] = res;
         this.alert.showReasiganciones(data);
       }
  },
  error: (error) => {
    console.log('error en el subscriber filtro solicitudes');
  }
  
 })

     } 

     //solo fecha innicial
     if(solicitud === null && fechai !== null  && fechaf === null  ){
      //quietar validators
    console.log('entro');
    this.restaBlecerControls();

     let valores = this.items.filter(item => ( new Date(fechai)<= new Date(item.fechai) ));
  
     this.items =[];
     this.items= valores;
     console.log(this.items);
     console.log(valores);

    } 
 //solo fecha final 
    if(solicitud === null && fechai === null  && fechaf !== null  ){
      //quietar validators
      this.restaBlecerControls();

     let valores = this.items.filter(item => ( new Date(fechaf)>= new Date(item.fechai) ));
  
     this.items =[];
     this.items= valores;
     console.log(this.items);
     console.log(valores);
  
    } 

 //solo fecha final y fecha final
    if(solicitud === null && fechai !== null  && fechaf !== null  ){
   
     let valores = this.items.filter(item => (new Date(item.fechai) >= new Date(fechai) && new Date(item.fechai) <= new Date(fechaf)));
  
      this.items =[];
      this.items= valores;
      console.log(this.items);
      console.log(valores);
   
      this.restaBlecerControls();
    }


if (this.busquedasForm.invalid)  {
 // this.restaBlecerControls();

  this.busquedasForm.markAllAsTouched();
  this.reTbecerControles();
  this.messageError ='Seleccione al menos un valor de búsqueda';
  this.forms.eventos("alerta");
  return;
  
}

    
  }


  
  restaBlecerControls(){

    let solicitud = this.busquedasForm.controls['solicitud'].value;
    let fechai = this.busquedasForm.controls['fechai'].value;
    let fechaf = this.busquedasForm.controls['fechafi'].value;

    if(solicitud !== null && fechai === null  && fechaf === null){
    
      this.busquedasForm.controls["fechai"].setErrors(null);
      this.busquedasForm.controls['fechai'].clearValidators();
      this.busquedasForm.controls["fechai"].updateValueAndValidity();

      this.busquedasForm.controls["fechafi"].setErrors(null);
      this.busquedasForm.controls['fechafi'].clearValidators();
      this.busquedasForm.controls["fechafi"].updateValueAndValidity();

    }
    
    if(solicitud === null && fechai !== null  && fechaf === null){

      this.busquedasForm.controls["solicitud"].setErrors(null);
      this.busquedasForm.controls['solicitud'].clearValidators();
      this.busquedasForm.controls["solicitud"].updateValueAndValidity();
      this.busquedasForm.controls["fechafi"].setErrors(null);
      this.busquedasForm.controls['fechafi'].clearValidators();
      this.busquedasForm.controls["fechafi"].updateValueAndValidity();

    }



    if(solicitud === null && fechai === null  && fechaf !== null ){

      this.busquedasForm.controls["solicitud"].setErrors(null);
       this.busquedasForm.controls['solicitud'].clearValidators();
        this.busquedasForm.controls["solicitud"].updateValueAndValidity();
         this.busquedasForm.controls["fechai"].setErrors(null);
         this.busquedasForm.controls['fechai'].clearValidators();
         this.busquedasForm.controls["fechai"].updateValueAndValidity();

    }
    if(solicitud === null && fechai !== null  && fechaf !== null  ){
  
    this.busquedasForm.controls["solicitud"].setErrors(null);
    this.busquedasForm.controls['solicitud'].clearValidators();
    this.busquedasForm.controls["solicitud"].updateValueAndValidity();
  }
  }
  

  reTbecerControles(){
    this.busquedasForm.controls["solicitud"].setErrors(null);
    this.busquedasForm.controls["solicitud"].addValidators([Validators.required,Validators.min(99999),Validators.max(999999999)]);
    this.busquedasForm.controls["solicitud"].updateValueAndValidity();
    this.busquedasForm.controls["fechai"].setErrors(null);
    this.busquedasForm.controls["fechai"].addValidators([Validators.required]);
    this.busquedasForm.controls["fechai"].updateValueAndValidity();
    this.busquedasForm.controls["fechafi"].setErrors(null);
    this.busquedasForm.controls["fechafi"].addValidators([Validators.required]);
    this.busquedasForm.controls["fechafi"].updateValueAndValidity();
    
  }


  reDireciona(){
    this.router.navigate(["/login"]);
    localStorage.clear();
    
  }

}
