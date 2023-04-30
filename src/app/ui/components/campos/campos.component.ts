import { Component, OnInit } from '@angular/core';
import { AlertsService } from '../../../domain/services/alerts.service';

@Component({
  selector: 'app-campos',
  templateUrl: './campos.component.html',
  styleUrls: ['./campos.component.scss']
})
export class CamposComponent implements OnInit {

  constructor(private alert:AlertsService) { }

  ngOnInit(): void {
  }

  cerrar(){
  
  this.alert.closeLoading();
  }

}
