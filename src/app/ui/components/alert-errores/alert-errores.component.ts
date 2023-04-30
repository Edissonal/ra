import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { AlertsService } from 'src/app/domain/services/alerts.service';
import { NgbAlert, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from 'src/app/domain/services/users.service';
import { FormsService } from 'src/app/domain/services/forms.service';

@Component({
  selector: 'app-alert-errores',
  templateUrl: './alert-errores.component.html',
  styleUrls: ['./alert-errores.component.scss']
})
export class AlertErroresComponent implements OnInit {


  @Input() type = "danger";
  @Input() message = "";
	//@ViewChild('staticAlert', { static: false }) staticAlert!: NgbAlert;
  estado:boolean=false;
	staticAlertClosed = false;
  valor:boolean=true;
  prueba!:boolean;

  constructor(private alert:AlertsService,
              private  user:UsersService,
              private  forms:FormsService) {
  
                /*escucha los eventos indicados para mostrar la alerta*/
            this.forms.eventos$.subscribe(res => {
            if(res == "alerta"){
          this.staticAlertClosed = true;
            setTimeout(() => {this.staticAlertClosed = false;}, 5000);
            
          }
    })
  

  
  }
  

  ngOnInit(): void {

  }
  


}
