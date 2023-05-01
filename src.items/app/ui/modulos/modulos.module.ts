import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from '../components/header/header.component';
import { LogosComponent } from '../components/logos/logos.component';
import { FooterComponent } from '../components/footer/footer.component';
import { HomeComponent } from '../pages/home/home.component';
import { ConsultasRaComponent } from '../pages/ra/consultas-ra/consultas-ra.component';
import { OpBusquedaComponent } from '../components/op-busqueda/op-busqueda.component';
import { TarjetasComponent } from '../components/tarjetas/tarjetas.component';
import { DetalleDocumentosComponent } from '../components/detalle-documentos/detalle-documentos.component';

import { CamposComponent } from '../components/campos/campos.component';
import { ListasComponent } from '../components/listas/listas.component';
import { ConseptosComponent } from '../components/conseptos/conseptos.component';
import { DetallesReposisionComponent } from '../pages/ca/operador/detalles-reposision/detalles-reposision.component';
import { OrdenPedidoComponent } from '../pages/ca/operador/orden-pedido/orden-pedido.component';
import { RevocacionesComponent } from '../components/revocaciones/revocaciones.component';
import { ComponentesModule } from '../components/componentes.module';






@NgModule({
  declarations: [
    HeaderComponent,
    LogosComponent,
    FooterComponent,
    HomeComponent,
    ConsultasRaComponent,
    TarjetasComponent,
    DetalleDocumentosComponent,
    CamposComponent,
    ListasComponent,
    DetallesReposisionComponent,
    ConseptosComponent,
    OrdenPedidoComponent,
    RevocacionesComponent,
    OpBusquedaComponent


  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentesModule
  ],exports:[
  HeaderComponent,
  LogosComponent,
  FooterComponent,
  HomeComponent,
  ConsultasRaComponent,
  TarjetasComponent,
  CamposComponent,
  ListasComponent,
  DetallesReposisionComponent,
  OrdenPedidoComponent,
  RevocacionesComponent,
  OpBusquedaComponent

  ]
})
export class ModulosModule { }
