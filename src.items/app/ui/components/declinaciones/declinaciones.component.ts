import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertsService } from '../../../domain/services/alerts.service';

@Component({
  selector: 'app-declinaciones',
  templateUrl: './declinaciones.component.html',
  styleUrls: ['./declinaciones.component.scss']
})
export class DeclinacionesComponent implements OnInit {

  constructor(private router:Router,
              private alert:AlertsService) { }

  ngOnInit(): void {
  }

    /*redirige modal al modulo de tareas*/ 
    redirigirTo(){
      this.router.navigate(["/tareas"]);
      this.alert.closeDeclinaciones();
      }
    
  /*cerrar modal declinaciones */
    cerrar(){
      this.alert.closeDeclinaciones();
      }
    
  

}
