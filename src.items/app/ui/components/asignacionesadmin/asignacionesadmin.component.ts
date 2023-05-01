import { Component, OnInit } from '@angular/core';
import { AlertsService } from '../../../domain/services/alerts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-asignacionesadmin',
  templateUrl: './asignacionesadmin.component.html',
  styleUrls: ['./asignacionesadmin.component.scss']
})
export class AsignacionesadminComponent implements OnInit {

  constructor(private alert:AlertsService,
              private router:Router) { }

  ngOnInit(): void {
  }

    /*redirige modal*/ 
 /*   redirigirTo(){
      this.router.navigate(["/tareas"]);
      this.alert.closeconsepto();
      }*/
    
  //cerrar ventana reasignacioness
    cerrar(){
      this.alert.closeshowasignacionesAdmin();
      }
      
      
  /*    revocarAsignar(){
        this.router.navigate(["/orden-pedido"]);
        this.alert.closeconsepto();
      }
    
*/
}
