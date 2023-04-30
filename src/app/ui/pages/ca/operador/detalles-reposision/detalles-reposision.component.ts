import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertsService } from 'src/app/domain/services/alerts.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-detalles-reposision',
  templateUrl: './detalles-reposision.component.html',
  styleUrls: ['./detalles-reposision.component.scss']
})
export class DetallesReposisionComponent implements OnInit {

  traza:any;

  constructor(private alert:AlertsService,
              private modalService: NgbModal,
              private router:Router) { }

  ngOnInit(): void {
  }

/*abremodal del servicio de alertas*/
 ventana(){
  
  this.alert.showLoading();
}

showConsepto(){

  console.log('ejecutado')
  this.alert.showconsepto();

}

/*abremodal local*/

trazaL(content:any) {
  this.traza =this.modalService.open(content,{ backdrop: "static", size: "ms", centered: true })
}

closetrazaL() {
  this.traza.close();
}

/*modal declinaciones*/
declinaciones(){
 this.alert.showDeclinaciones();
}

  /*redireciona  a las tareas*/
  reDireciona(){
    this.router.navigate(["/tareas"]);
  }

}



