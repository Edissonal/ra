import { Injectable } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { TasksRepositoryService } from 'src/app/infraestucture/driven-adapter/tasks.repository.service';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  
  reasigna$ = new Observable<Object>;
  interval$ = interval(180000);
//  interval$ = interval(180000);
  constructor(private ExtTaks:TasksRepositoryService) { }

  /*tareas sin gestionar*/
    cargaTareas(colas:number,user:string,mensajes:number,fecha:Date){
    return this.ExtTaks.ExtcargaTareas(colas,user,mensajes,fecha);
  }

  /*carga tereas pendientes por autoriuzar */
  cargaPendientes(){
    return this.ExtTaks.ExPendientes();
  }

  //filtra las solicitudes
  filtrarSolicitudes(solicitud:number){
    return this.ExtTaks.ExSolicitudes(solicitud) 
  }

  //asignar solicitudes
  ReasignarSo(solicitud:any){
    return this.ExtTaks.ExrAsignacionT(solicitud);
  }

  //elimina asignaciones
  DeleteAsignacion(id:number){
    return this.ExtTaks.ExtDeleteAsignacion(id);
  }

    //Guarda auditorias
    aditoriAsignacion(datos:any){
      return this.ExtTaks.ExrAuditoria(datos);
    }
  
    //trae detalle del documento
    detalleDoc(cola:any,solicitud:any){
      return this.ExtTaks.ExrdetalleDoc(cola,solicitud);
    }
}
