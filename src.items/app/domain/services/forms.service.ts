import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors, FormArray, ValidatorFn, FormControl } from '@angular/forms';
import { NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Subject, of } from 'rxjs';



/**
 * This Service handles how the date is rendered and parsed from keyboard i.e. in the bound input field.
 */



@Injectable({
  providedIn: 'root'
})
export class FormsService {
     // declaracion de sujeto para multiples observables  Fuentes de cadenas observables
     private  envios = new Subject<any>();
     // Flujos de cadenas observables
     // Observable de tipo string 
     eventos$ = this.envios.asObservable();
     // Comandos de mensajes de servicio


  constructor() { }


    /*emicion de eventos formularios*/
    eventos(change: any) {
      this.envios.next(change);
  }


  /*validacion de campo numerico*/
  minimos(numero:string){
    return (formGroup: AbstractControl): ValidationErrors  | null => {
      
  let numerosolo = /^[0-9]+$/;
  const indi = formGroup.get(numero)!.value;
  const numeros = String(indi);

   let comas = /[^.,]/;

  
  function getNumberLength(num:number) {
    return Math.ceil(Math.log10(num + 1));
  }

  let valor = getNumberLength(indi);
   // console.log(comas.test(numeros));
   //console.log(indi);
 

  if(   valor <7   || valor >7 || indi == "" || indi == null ||!numeros.match(indi) ){
        
    formGroup.get(numero)!.setErrors({ vacioindi: true });
    return {vacioindi:true}
  }
    
     formGroup.get(numero)!.setErrors(null);
     return null;
    
    }
  
  }
  

  //validaciones de commas
  //implementacion de validacion de comas
  noPuntoComa(datos:any) {
    const noSpecialCharacters = datos.replace(/[^a-zA-Z0-9 ]/g, '');
  //  console.log(noSpecialCharacters); // 👉️ 'hello 123 WORLD'
   return of(noSpecialCharacters);
  }
}