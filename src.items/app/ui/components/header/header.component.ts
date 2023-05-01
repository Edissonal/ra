import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertsService } from 'src/app/domain/services/alerts.service';
import { UsersService } from 'src/app/domain/services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  usuario:any;
  muestra:boolean= false;
  constructor(private router:Router,
              private user:UsersService,
              private  alert:AlertsService) { 
              
                /*validacion de evento modal cerrar sesion y comportamiemto de header*/
                this.user.eventos$.subscribe(res => {  
                    if(res == "menu"){
                      this.muestra= true;
                      localStorage.setItem("menu", JSON.stringify(this.muestra= true));
                    }else{
                      this.muestra= false;
                    }
                    if(res == "loginout"){
                      this.muestra= false;
                    }
                });
              
              }


  ngOnInit(): void { 
   this.usuario = JSON.parse(localStorage.getItem('usuario')!);
   this.muestra = JSON.parse(localStorage.getItem('menu')!);
  }



  redireciona(){
  //  this.router.navigate(["/login"]);
   // localStorage.clear();
   // this.muestra = false;
   this.alert.showSConfirmation();
  }


}
