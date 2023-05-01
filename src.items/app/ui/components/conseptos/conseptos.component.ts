import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { AlertsService } from '../../../domain/services/alerts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-conseptos',
  templateUrl: './conseptos.component.html',
  styleUrls: ['./conseptos.component.scss']
})
export class ConseptosComponent implements OnInit {



  constructor(private alert:AlertsService,
              private router:Router) { 

              
              }

  ngOnInit(): void {
  }


  /*redirige modal*/ 
  redirigirTo(){
    this.router.navigate(["/tareas"]);
    this.alert.closeconsepto();
    }
  

  cerrar(){
    this.alert.closeconsepto();
    }
    
    
    revocarAsignar(){
      this.router.navigate(["/orden-pedido"]);
      this.alert.closeconsepto();
    }
  


}
