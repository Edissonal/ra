import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors, FormArray, ValidatorFn, FormControl } from '@angular/forms';
import { NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Subject, of } from 'rxjs';

@Injectable()
export class CustomAdapter extends NgbDateAdapter<string> {
	readonly DELIMITER = '-';

	fromModel(value: string | null): NgbDateStruct | null {
		if (value) {
			const date = value.split(this.DELIMITER);
			return {
				day: (date[0], 10),
				month: parseInt(date[1], 10),
				year: parseInt(date[2], 10),
			};
		}
		return null;
	}

	toModel(date: NgbDateStruct | null): string | null {

  return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : null;
	}
}


/**
 * This Service handles how the date is rendered and parsed from keyboard i.e. in the bound input field.
 */

@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {
	readonly DELIMITER = '/';

	parse(value: string): NgbDateStruct | null {
		if (value) {
			const date = value.split(this.DELIMITER);
			return {
				day: (date[0], 10),
				month: parseInt(date[1], 10),
				year: parseInt(date[2], 10),
			};
		}
		return null;
	}

	format(date: NgbDateStruct | null): string {
  return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : '';
	}
}



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