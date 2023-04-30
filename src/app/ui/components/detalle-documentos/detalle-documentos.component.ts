import { Component, OnInit } from '@angular/core';
import { AlertsService } from '../../../domain/services/alerts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TasksService } from 'src/app/domain/services/tasks.service';

@Component({
  selector: 'app-detalle-documentos',
  templateUrl: './detalle-documentos.component.html',
  styleUrls: ['./detalle-documentos.component.scss']
})
export class DetalleDocumentosComponent implements OnInit {

  rechazo:any;
  correos:any;
  id:string='';
  datos!:any;
  constructor(private alert:AlertsService,
              private router:Router,
              private modalService: NgbModal,
              private activateroute:ActivatedRoute,
              private task:TasksService
              ) {
              this.activateroute.params
              .subscribe(res=>{
                this.id= res['id'];
                this.task.detalleDoc(1,this.id)
                .subscribe((res:any)=>{
                  console.log(res);
                 let [datos] = res;
                  this.datos= datos;
                console.log(this.datos= datos);  
                });

              });
              
              }

  ngOnInit(): void {
  }



  /*abremodal del servicio de alertas*/
  ventana(){
  
    this.alert.showLoading();
  }
  /*redireciona  a las tareas*/
  reDireciona(){
    this.router.navigate(["/tareas"]);
  }

    /*abremodal del servicio de alertas*/
  listasOpen(){

   console.log('ejecutado');
  this.alert.showListas();
  }

  //modal rechazo
	open(content:any) {
   this.rechazo = this.modalService.open(content, { backdrop: "static", size: "ms", centered: true })
  }

  cerrar(){
    this.rechazo.close();
  }


  //modal correos asociados

	openCorreos(asociados:any) {
    this.correos = this.modalService.open(asociados, { backdrop: "static", size: "ms", centered: true })
   }
 
   cerrarMail(){
    this.correos.close();
  }

/*redirige al home*/
  redirige(){
    this.router.navigate(["/tareas"]);
  }

}
