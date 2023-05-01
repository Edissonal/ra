import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertsService } from 'src/app/domain/services/alerts.service';
import { FormsService } from 'src/app/domain/services/forms.service';
import { TasksService } from 'src/app/domain/services/tasks.service';

@Component({
  selector: 'app-reasignaciones',
  templateUrl: './reasignaciones.component.html',
  styleUrls: ['./reasignaciones.component.scss']
})
export class ReasignacionesComponent implements OnInit {
 
  @Input()  data:any;
  Reasignaform:FormGroup;

  constructor(private alert:AlertsService,
              private router:Router,
              private task:TasksService,
              private forms:FormsService,
              public activeModal: NgbActiveModal,
              private fb:FormBuilder
              ) { 
              

                this.Reasignaform = this.fb.group({
                  solicitud: [{ value: '', disabled: true }, []],
                  empresa: [{ value: '', disabled: true }, []],
                  documento: [{ value: '', disabled: true }, []],
                  certificado: [{ value: '', disabled: true }, []],
                  fechai: [{ value: '', disabled: true }, []],
                  usuario: [{ value: '', disabled: true }, []],
                  estado: [{ value: '', disabled: true }, []],
                  motivo: ['', [Validators.required, Validators.minLength(30),Validators.maxLength(250)]],
            })
               
       
              }

  ngOnInit(): void {

   console.log(this.data);


  }

  /*implementacion de envio de datos*/
  envioDatos(){

    if (this.Reasignaform.invalid) {
      this.Reasignaform.markAllAsTouched();
      return;
    }
    let fechaModi = new Date(); 
    let {certificado,documento,empresa,estado,fechai,solicitud,usuario,cola} = this.data;
    let {user}=JSON.parse(localStorage.getItem('usuario')!);
    let roll=JSON.parse(localStorage.getItem('roll')!);

  

    let datos={
      "certificado":certificado,
      "documento":documento,
      "empresa":empresa,
      "estado":estado,
      "fechai":fechai,
      "solicitud":solicitud,
      "user":user,
      "id":solicitud,
      "cola":cola
    }
     let auditoria={
      "certificado":certificado,
      "documento":documento,
      "empresa":empresa,
      "estado":estado,
      "fechai":fechai,
      "solicitud":solicitud,
      "user":user,
      "olduser":usuario,
      "fechaMo":fechaModi,
      "cola":cola
    }


    //implementacion de acciones ingreso e eliminacion de datos
    this.task.ReasignarSo(datos).subscribe(  {
      next: (res: any) => {
        console.log(res);
   },
   error: (error) => {
     console.log('error en el subscriber de reasignar solicitud');
   }
   
 })


this.task.DeleteAsignacion(solicitud).subscribe(  {
  next: (res: any) => {
  console.log(res);
},
error: (error) => {
 console.log('error en el subscriber de eliminar asignacion');
}
})

this.task.aditoriAsignacion(auditoria).subscribe(  {
  next: (res: any) => {
    console.log(res);

},
error: (error) => {
 console.log('error en el audioria');
}
})


  //  console.log(this.Reasignaform.value);
    this.alert.closeReasiganciones();
  
  }

  /*cerrar asignaciones*/
  cerrar(){
    this.alert.closeReasiganciones();
    }

    
    redirecTareas(){
      this.router.navigate(["/tareas"]);
      this.alert.closeasignaciones();
    }
  
    campoEsValido(campo: string) {
      return this.Reasignaform.controls[campo].errors&& this.Reasignaform.controls[campo].touched;
    }

}
