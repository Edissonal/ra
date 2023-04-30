import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/domain/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserRepositoryService {


  //url= 'http://TGP-5369:3000';
  url= 'http://localhost:3000';
  //url= 'https://my-json-server.typicode.com/Edissonal/server-edisson';

  constructor(private http:HttpClient,
              private router:Router) { }

  // carga de items filtrados  de tarjetas de acuerdo al roll especificado
  ExtcargaPerfil(user:User):Observable<User[]>{
    console.log('ejecutado');
   return this.http.get<User[]>(`${ this.url}/usuarios/?q=${user}`);

    }

    //consultas de codigo opt
    ExValidacionPerfil(user:any){
      console.log(user[0].opt);
     return this.http.get(`${ this.url}/opt?opt=${user[0].opt}`);
    }

    //carga de roles segun filtro
    Exroles(roll:any){
      //  console.log(roll[0].user);
        return this.http.get(`${ this.url}/roles?user=${roll}`);
      }


  }

