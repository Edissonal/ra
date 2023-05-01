import { Component, OnInit } from '@angular/core';
import { AlertsService } from '../../../../../domain/services/alerts.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orden-pedido',
  templateUrl: './orden-pedido.component.html',
  styleUrls: ['./orden-pedido.component.scss']
})
export class OrdenPedidoComponent implements OnInit {

  traza:any;
  constructor(private alert:AlertsService,
              private modalService: NgbModal ,
              private router:Router) { }

  ngOnInit(): void {
  }


  revoca(){
    this.alert.showRevovaciones();
  }
  
//muetreo de modal asignaciones
  closetrazaL(){
 
  }

/*abremodal local*/

trazaL() {
  this.alert.showasignaciones();
  //this.traza =this.modalService.open(content,{ backdrop: "static", size: "ms", centered: true })
}

  /*redireciona  a las tareas*/
  reDireciona(){
    this.router.navigate(["/detalles-repo"]);
  }

}
