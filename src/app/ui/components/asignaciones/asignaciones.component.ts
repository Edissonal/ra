import { Component, OnInit } from '@angular/core';
import { AlertsService } from '../../../domain/services/alerts.service';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-asignaciones',
  templateUrl: './asignaciones.component.html',
  styleUrls: ['./asignaciones.component.scss']
})
export class AsignacionesComponent implements OnInit {

  Reasignaform!: FormGroup;

  constructor(private alert:AlertsService,
              private router:Router,
              private fb:FormBuilder) { 
              
          this.Reasignaform = this.fb.group({
                  usuario: [{ value: '', disabled: true }, []],
                 
            })
               
              
              }


    asignaciones(){
              
              }

  ngOnInit(): void {
  }

  redirigirTo(){
    this.router.navigate(["/tareas"]);
    this.alert.closeconsepto();
    }
  
/*cerrar asignaciones*/
  cerrar(){
    this.alert.closeasignaciones();
    }
    
    
    revocarAsignar(){
      this.router.navigate(["/orden-pedido"]);
      this.alert.closeconsepto();
    }

    redirecTareas(){
      this.router.navigate(["/tareas"]);
      this.alert.closeasignaciones();
    }
  

}
