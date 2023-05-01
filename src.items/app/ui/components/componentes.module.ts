import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeclinacionesComponent } from './declinaciones/declinaciones.component';
import { AsignacionesComponent } from './asignaciones/asignaciones.component';
import { AsignacionesadminComponent } from './asignacionesadmin/asignacionesadmin.component';
import { AlertErroresComponent } from './alert-errores/alert-errores.component';
import { LoadingComponent } from './loading/loading.component';
import { LoginOutComponent } from './login-out/login-out.component';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReasignacionesComponent } from './reasignaciones/reasignaciones.component';




@NgModule({
  declarations: [
   DeclinacionesComponent,
   AsignacionesComponent,
   AsignacionesadminComponent,
   AlertErroresComponent,
   LoadingComponent,
   LoginOutComponent,
   ReasignacionesComponent,
   

  ],
  imports: [
    CommonModule,
    NgbAlertModule,
    FormsModule,
    ReactiveFormsModule
    
  ],exports:[
    DeclinacionesComponent,
    AsignacionesComponent,
    AsignacionesadminComponent,
    AlertErroresComponent,
    LoadingComponent,
    LoginOutComponent
  ]
})
export class ComponentesModule { }
