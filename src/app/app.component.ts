import { Component } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { debounce, debounceTime, fromEvent } from 'rxjs';
import { UsersService } from './domain/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ra';

  constructor(private user:UsersService,
              private router:Router){
  
    this.user.idle$.subscribe(s => 
   //  console.log('im idle, zzz')

      this.user.clearSesion()
      );
  //  this.user.wake$.subscribe(s => console.log('im awake!'));
  
  }

  ngOnInit(): void {


  }

}
