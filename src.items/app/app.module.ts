import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbDateAdapter, NgbDateParserFormatter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './ui/pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModulosModule } from './ui/modulos/modulos.module';
import { HomeComponent } from './ui/pages/home/home.component';
import { HttpClientModule } from '@angular/common/http';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    ModulosModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
