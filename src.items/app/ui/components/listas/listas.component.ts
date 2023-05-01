import { Component, OnInit } from '@angular/core';
import { AlertsService } from '../../../domain/services/alerts.service';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss']
})
export class ListasComponent implements OnInit {

  constructor(private alert:AlertsService) { }

  ngOnInit(): void {
  }


  cerrar(){
    this.alert.closeListas();
    }
  

}
