import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UsersService } from 'src/app/domain/services/users.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  items:any[]=[];
  tamano!:number;
  
  constructor(private user:UsersService,
              private router:Router) { 



  
  }

  ngOnInit(): void {



    this.items =[
      {
        "id": 1,
        "logo":"fa-solid fa-list-check fa-5x color",
        "titulo": "Revision",
        "texto":"RA",
        "conteo":100,
        "pagina":"tareas"
       },
       {
        "id": 2,
        "logo":"fa-solid fa-briefcase fa-5x color",
        "titulo": "Emision",
        "texto":"CA",
        "conteo":331,
        "pagina":"tareas"
       },
       {
        "id": 3,
        "logo":"fa-solid fa-sheet-plastic fa-5x color",
        "titulo": "Servicio al cliente",
        "texto":"",
        "conteo":99,
        "pagina":"tareas"
       }
       ,
       {
        "id": 4,
        "logo":"fa-solid fa-truck-fast fa-5x color",
        "titulo": "Logistica",
        "texto":"ENV",
        "conteo":23,
        "pagina":"logistica"
       }
       
    ];


    this.user.cargatarjeta(this.items)
      .subscribe({
        next: (res: any) => {

           this.items = res;

          console.log(res);
        }, error: (error) => {
          console.log('error en el subscriber');
        }
      }


      );




  
  }

      //opciones de menu

//calculo de resolucion de pantalla
onResize(event:any) {
  this.tamano =event.target.innerWidth;
  }
  
  //apliacion de de estilo deacuerdo a resolucion
  validar(){
  
    return (this.tamano <= 985) ? 'cartas': 'cartas tamanoCard';
  }

//redireciones de pagina del home
  reDireciones(ruta:string){
  
  console.log(ruta);

    switch(ruta) {
      case "tareas":
        this.router.navigate(["/tareas"]);
        break;

    }
  }
}
  
