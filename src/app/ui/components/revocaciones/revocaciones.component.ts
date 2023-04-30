import { Component, OnInit } from '@angular/core';
import { AlertsService } from '../../../domain/services/alerts.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-revocaciones',
  templateUrl: './revocaciones.component.html',
  styleUrls: ['./revocaciones.component.scss']
})
export class RevocacionesComponent implements OnInit {



  constructor(private alert:AlertsService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  cerrar(){
    this.alert.closeRevovaciones();
    }
  

}
