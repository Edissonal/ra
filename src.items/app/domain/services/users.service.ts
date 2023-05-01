import { Injectable } from '@angular/core';
import { filter, of, map, Subject, tap, fromEvent } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { UserRepositoryService } from 'src/app/infraestucture/driven-adapter/user.repository.service';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  /*definicion de observable para emitir evento de inecatividad*/
public idle$: Subject<boolean> = new Subject();
//public wake$: Subject<boolean> = new Subject();

isIdle = false;
private idleAfterSeconds = 200;
private countDown:any;

elementos:boolean = false;
logeo:boolean= false;
datos:any;

     // declaracion de sujeto para multiples observables  Fuentes de cadenas observables
     private  envios = new Subject<any>();
     // Flujos de cadenas observables
     // Observable de tipo string 
     eventos$ = this.envios.asObservable();
     // Comandos de mensajes de servicio

 constructor( private http:HttpClient,
              private router:Router,
              private ExUser:UserRepositoryService) {
                //escucha eventos por inactividad
                fromEvent(document, 'mousemove').subscribe(() => this.onInteraction());
                fromEvent(document, 'touchstart').subscribe(() => this.onInteraction());
                fromEvent(document, 'keydown').subscribe(() => this.onInteraction());
  
  }

  onInteraction() {
    // Está inactivo e interactuando emite evento en el caso de que se necesite emitir algo despues de que se pueda volver a activar
    if (this.isIdle) {
      this.isIdle = false;
    //  this.wake$.next(true);
    }

    // Interacción del usuario, reinicio del temporizador de inicio inactivo
    clearTimeout(this.countDown);
    this.countDown = setTimeout(() => {
      // Cuenta regresiva realizada sin interacción: emisión inactiva
      this.isIdle = true;
      this.idle$.next(true);
    }, this.idleAfterSeconds * 1_000)
  }


//clear sesion de usuario 

clearSesion(){
  this.router.navigate(["/login"])
  localStorage.clear();
  this.emitircambio("loginout");
  this.datos.unsubscribe();
}

    /*emicion de eventos flujo de compra*/
    emitircambio(change: any) {
      this.envios.next(change);
  }
  

// carga de items filtrados  de tarjetas de acuerdo al roll especificado
  cargaPerfil(user:any){

   return this.ExUser.ExtcargaPerfil(user)
   .pipe(
    tap(res =>  localStorage.setItem("usuario", JSON.stringify({...res[0]})))
    )

    }
    
    //consultas de codigo opt
   ValidacionPerfil(user:any){
  return this.ExUser.ExValidacionPerfil(user);
    
    }

    //carga de roles segun filtro
    roles(roll:any){
      return this.ExUser.Exroles(roll[0].user);
    }

    
    //carga de tarjetas dinamicas
    cargatarjeta(items:any){

   let  user =JSON.parse(localStorage.getItem('roll')!);
   let  itemsfiltrado;

    if (user == "Director") {
      itemsfiltrado = items;
      this.elementos = true;

    }
    if (user == "Coordinador RA") {
      itemsfiltrado = items.slice(0, 1)
      this.elementos = false;

    }
    if (user == "Coordinador CA") {
      itemsfiltrado = items.slice(1, 2)
      this.elementos = true;

    }
    if (user == "Coordinador Servicio al cliente") {   
      itemsfiltrado = items.slice(2, 3);
      this.elementos = true;
      this.router.navigate(["/tareas"]);
     }
    if (user == "Coordinador logistico") { itemsfiltrado = items.slice(3, 4) }
    if (user == "Operador Ra") {
      this.elementos = false;
      this.router.navigate(["/tareas"]);

    }
    if (user == "Operador CA") {
      this.elementos = true;
      this.router.navigate(["/tareas"]);

    }
    if (user == "Operador servicio al cliente") {
      this.elementos = true;
      this.router.navigate(["/tareas"]);
    }
      return of(itemsfiltrado);
    }
  
}


