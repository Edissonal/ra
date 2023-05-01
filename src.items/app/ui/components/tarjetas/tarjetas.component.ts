import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { UsersService } from 'src/app/domain/services/users.service';
import { AlertsService } from '../../../domain/services/alerts.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TasksService } from 'src/app/domain/services/tasks.service';


const FILTER_PAG_REGEX = /[^0-9]/g;
@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styleUrls: ['./tarjetas.component.scss']
})
export class TarjetasComponent implements OnInit {
  @Input() items: any[] = [];
  paginasa:number =0;
  page = 1;
  pageSize = 8;
  vistas:boolean=false;

  constructor(private user:UsersService,
              private alert:AlertsService,
              private router:Router
              ) { 

      
             
  }

  ngOnInit(): void {
  }


/* escuchando del servicio de items*/
ngOnChanges(changes: SimpleChanges) {
    let items = changes['items'].currentValue;

 //filtro de paginaciones por targeta
 let dato =items.length;
 this.paginasa =Math.round(dato / this.pageSize) *10; 

 console.log( this.paginasa );
 
 //validacion de elementos asignados para operadores
 this.vistas = this.user.elementos;
 console.log(changes['items'].currentValue);
     
}

  selectPage(page: string) {
		this.page = parseInt(page, 10) || 1;
	}

  formatInput(input: HTMLInputElement) {
		input.value = input.value.replace(FILTER_PAG_REGEX, '');
	}

//validaciones de redirecciones  segun perfil en tarjetas
  goTo(item:string){
   
    let  user =JSON.parse(localStorage.getItem('roll')!);

    if( user == "Director" || user == "Coordinador RA" || user == "Coordinador CA" || user == "Coordinador Servicio al cliente" ){
      this.alert.showasignacionesAdmin();
    }

    if(user == "Operador Ra"){
      this.router.navigate([`/detalles-doc/${item}`]);
    }

    if(user == "Operador CA"){
      this.router.navigate(["/detalles-repo"]);
    }


  }

}
