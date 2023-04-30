import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from 'src/app/ui/pages/login/login.component';
import { LogosComponent } from '../../ui/components/logos/logos.component';
import { CamposComponent } from '../../ui/components/campos/campos.component';
import { ListasComponent } from '../../ui/components/listas/listas.component';
import { ConseptosComponent } from '../../ui/components/conseptos/conseptos.component';
import { RevocacionesComponent } from '../../ui/components/revocaciones/revocaciones.component';
import { DeclinacionesComponent } from '../../ui/components/declinaciones/declinaciones.component';
import { AsignacionesComponent } from '../../ui/components/asignaciones/asignaciones.component';
import { AsignacionesadminComponent } from '../../ui/components/asignacionesadmin/asignacionesadmin.component';
import { AlertErroresComponent } from 'src/app/ui/components/alert-errores/alert-errores.component';
import { LoadingComponent } from 'src/app/ui/components/loading/loading.component';
import { LoginOutComponent } from 'src/app/ui/components/login-out/login-out.component';
import { ReasignacionesComponent } from '../../ui/components/reasignaciones/reasignaciones.component';


@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor(private modalService: NgbModal) {}

  modalLoading:any;
  modallistas:any;
  modalconsepto:any;
  modalrevocaciones:any;
  modaldeclinaciones:any;
  modalasignaciones:any;
  modaladmin:any;
  modalloading:any;
  modalreasignaciones:any;
  texto:string='';
  modalloginout:any;


  /*modal para campo de detalles*/
  showLoading(message:string = "") {
    this.modalLoading = this.modalService.open(CamposComponent, { backdrop: "static", size: "ms", centered: true });
  }

  closeLoading() {
    this.modalLoading.close();
  }

  //modal para listas consulta de listas
  
  showListas(){
    this.modallistas = this.modalService.open(ListasComponent, { backdrop: "static", size: "ms", centered: true });
  
  }

  closeListas() {
    this.modallistas.close();
  }
  

  /*modal para conseptos*/
  showconsepto(){
    this.modalconsepto = this.modalService.open(ConseptosComponent, { backdrop: "static", size: "ms", centered: true });
  }

  closeconsepto() {
    this.modalconsepto.close();
  }


    /*modal para Revocaciones*/
    showRevovaciones(){
      this.modalrevocaciones = this.modalService.open(RevocacionesComponent, { backdrop: "static", size: "ms", centered: true });
    }
  
    closeRevovaciones() {
      this.modalrevocaciones.close();
    }
  
    /*declinaciones*/


      showDeclinaciones(){
      this.modalasignaciones = this.modalService.open(DeclinacionesComponent, { backdrop: "static", size: "ms", centered: true });
    }
  
    closeDeclinaciones() {
      this.modalasignaciones.close();
    }
  

    //asignaciones
    showasignaciones(){
      this.modaldeclinaciones = this.modalService.open(AsignacionesComponent, { backdrop: "static", size: "ms", centered: true });
    }
  
    closeasignaciones() {
      this.modaldeclinaciones.close();
    }

    //reasignaciones administrador

    showasignacionesAdmin(){
      this.modaladmin = this.modalService.open(AsignacionesadminComponent, { backdrop: "static", size: "ms", centered: true });
    }
  
    closeshowasignacionesAdmin() {
      this.modaladmin.close();
    }

    //loading 
  
    showSpiner(){
      this.modalloading = this.modalService.open(LoadingComponent, { backdrop: "static", size: "ms", centered: true ,  modalDialogClass: 'dark-modal' });
    }
  
    closesSpiner() {
      this.modalloading.close();
    }

    /*ventana de conrfirmacion*/

    showSConfirmation(){
      this.modalloginout = this.modalService.open(LoginOutComponent, { backdrop: "static", size: "ms", centered: true });
    }
  
    closesConfirmation() {
      this.modalloginout.close();
    }


  /*reasignaciones tareas operador ra */
  showReasiganciones(data:any){
    this.modalreasignaciones = this.modalService.open(ReasignacionesComponent, { backdrop: "static", size: "ms", centered: true })

    this.modalreasignaciones.componentInstance.data = data;
  }

  closeReasiganciones(){
    this.modalreasignaciones.close();
  }


}
