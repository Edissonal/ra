import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, interval, map, of, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksRepositoryService {

  //url= 'http://TGP-5369:3000';
  url= 'http://localhost:3000';



  constructor(private http:HttpClient) {
  

  //this.interval$.pipe(take(3)).subscribe( res=>{
 /* this.interval$.pipe().subscribe( res=>{
  
    console.log(this.texto)
  });  */


  }

  /*Carga tareas pendientes usuario*/
  ExtcargaTareas(colas:number,user:string,mensajes:number,fecha:Date){
    return this.http.get(`${ this.url}/items?cola=${colas}&user=${user}`);
  }

      //carga  carga items pendientes
   ExPendientes(){
   //  console.log(roll[0].user);
    return this.http.get(`${ this.url}/itemsAsignacion`);
     }

    //filtrar solicitudes
    ExSolicitudes(solicitud:number){
      //  console.log(roll[0].user);
       return this.http.get(`${ this.url}/filtros?solicitud=${solicitud}`);
        }
   
      //tomar asignaciones y reasignarlas
      ExrAsignacionT(roll:any){
        console.log(roll);
        //  console.log(roll[0].user);
          return this.http.post(`${this.url}/items`,roll);
        }
        
     /*eliminar solicitudes de cola origen*/   
     ExtDeleteAsignacion(id:number){
      console.log(id);
     
        return this.http.delete(`${this.url}/filtros/${id}`)
               .pipe(
                catchError(err=> of(false)),
                map(res => true)
                );
        }

      //Guardar auditorias
      ExrAuditoria(datos:any){
        console.log(datos);
        //  console.log(roll[0].user);
          return this.http.post(`${this.url}/auditoria`,datos);
        }
        
   //trae detalle del documento
   ExrdetalleDoc(cola:any,solicitud:any){
    console.log(cola,solicitud);
    // console.log(roll[0].user);
    return this.http.get(`${ this.url}/detalleso?solicitud=${solicitud}&user=${cola}`);
    }
    

}
