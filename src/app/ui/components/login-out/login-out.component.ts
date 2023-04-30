import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertsService } from 'src/app/domain/services/alerts.service';
import { UsersService } from '../../../domain/services/users.service';

@Component({
  selector: 'app-login-out',
  templateUrl: './login-out.component.html',
  styleUrls: ['./login-out.component.scss']
})
export class LoginOutComponent implements OnInit {

  constructor(private alert:AlertsService,
              private router:Router,
              private user:UsersService) { }

  ngOnInit(): void {
  }

/*cierra pestaña redireciones a portal externo**/
  close(){
  this.alert.closesConfirmation();
  window.location.href='http://50.17.217.196';
  }

  /*cierra la sesion y mata todas las sesiones*/
  clear(){

    //this.router.navigate(["/login"]);

  this.alert.closesConfirmation();
 /*   this.router.navigate(["/login"]);
    this.user.emitircambio("loginout");
    localStorage.clear();
    */

    this.user.clearSesion();
  }

}
