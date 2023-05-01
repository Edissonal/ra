import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/domain/services/users.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { pipe, map, filter, fromEvent, debounceTime } from 'rxjs';
import { AlertsService } from 'src/app/domain/services/alerts.service';
import { setInterval } from 'timers';
import { FormsService } from 'src/app/domain/services/forms.service';
import { User } from 'src/app/domain/models/user.model';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],

})
export class LoginComponent implements OnInit {

  loginform!: FormGroup
  tamano!: number;
  fechaini: any = '';
  roll: any;
  datos:User[] = [];
  errores: boolean = false;
  mensaje: string = 'Codigo opt invalido';
  showmenu:boolean=false;

  constructor(
    private router: Router,
    private user: UsersService,
    private fb: FormBuilder,
    private alert: AlertsService,
    private forms: FormsService
  ) {

    /*validaciones de campos obligatorios*/
    this.loginform = this.fb.group({
      usuario: [{ value: '', disabled: true }, [Validators.required, Validators.minLength(3), Validators.maxLength(14)]],
      opt: [],
    }, { validators: [this.forms.minimos('opt')] })

  }


  ngOnInit(): void {


    fromEvent(window ,'offline').pipe(
      debounceTime(100)).subscribe( (event:Event)=>{
      
        this.mensaje = "validar conexion a internet";
        this.errores = true;
      
      });


      fromEvent(window ,'online').pipe(
        debounceTime(100)).subscribe((event:Event)=>{
          this.errores = false;
        });



    this.validar();
    /*calculo de tamaño de pagina*/
    this.tamano = screen.width;

    //llamado de sesion de usuario
    this.user.cargaPerfil('monica.duenes')
      .subscribe({
        next: (res) => {
          console.log(res);
          let [datos] = res;
          this.datos = res;
          this.loginform.controls['usuario'].setValue(datos.user);
        },
        error: (error) => {
          console.log('error en el subscriber');
        }

      });

  }


  campoEsValido(campo: string) {
    return this.loginform.controls[campo].errors&& this.loginform.controls[campo].touched;
  }



  //calculo de resolucion de pantalla
  onResize(event: any) {
    this.tamano = event.target.innerWidth;
  }

  //apliacion de de estilo deacuerdo a resolucion
  validar() {

    return (this.tamano > 585) ? 'col-3 col-md-6 margenconf tamano' : 'col-12 col-md-6';
  }

  /*Validacion de datos antes de redirecionar/*/
  autenticarRoll() {
    if (this.loginform.invalid) {
      this.loginform.markAllAsTouched();
      return;
    }

    let { opt } = this.loginform.value;
    this.datos[0].opt = opt;

    /*envio de datos de la validacion de roll*/
    this.user.ValidacionPerfil(this.datos)
      .subscribe({
        next: (res: any) => {
          this.alert.showSpiner();
        /*emulacion de peticion*/
          setTimeout(() => {

            console.log(res);
            let [dato] = res;
            if (res.length == 0) {


              console.log("codigo invalido");

              this.errores = true;
              this.alert.closesSpiner();

            } else {

              if (dato.status == true) {
                this.user.roles(this.datos)
                  .subscribe({
                    /*reaigo el roll del usuario*/
                    next: (res: any) => {
                      let [data] = res;
                      console.log(data.roll);
                      localStorage.setItem("roll", JSON.stringify(data.roll));
                      this.router.navigate(["/home"]);
                      this.user.logeo =true;
                      /*se emite un cambio hacia el header*/
                      this.user.emitircambio("menu");
                      this.alert.closesSpiner();
                    }, 
                    error: (error) => {
                      console.log('error en el subscriber');
                    }
                  });

              }
              if (dato.status == false) {
                this.errores = true;
                this.mensaje = 'El usuario no tiene roll asignado, por favor comuníquese con el director de operaciones';
                console.log(this.mensaje);
                this.alert.closesSpiner();
              }
            }

          }, 100);
        },
        error: (error) => {
          console.log('error en el subscriber');
        }
      });
  }


  /*validacion de campos*/
  caracTeres(datos: any) {
    this.forms.noPuntoComa(datos)
      .subscribe(  {
         next: (res: any) => {
        // this.palabra2 = res;
        this.loginform.controls['opt'].setValue(res);
      },
      error: (error) => {
        console.log('error en el subscriber');
      }
    })
  }
}
