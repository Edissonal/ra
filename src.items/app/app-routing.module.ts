import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './ui/pages/login/login.component';
import { HomeComponent } from './ui/pages/home/home.component';
import { ConsultasRaComponent } from './ui/pages/ra/consultas-ra/consultas-ra.component';
import { OpBusquedaComponent } from './ui/components/op-busqueda/op-busqueda.component';
import { DetalleDocumentosComponent } from './ui/components/detalle-documentos/detalle-documentos.component';
import { DetallesReposisionComponent } from './ui/pages/ca/operador/detalles-reposision/detalles-reposision.component';
import { OrdenPedidoComponent } from './ui/pages/ca/operador/orden-pedido/orden-pedido.component';



const routes: Routes = [

  {path:'login' ,component:LoginComponent},
  {path:'home' ,component:HomeComponent},
  {path:'tareas' ,component:ConsultasRaComponent},
  {path:'detalles-doc/:id' ,component:DetalleDocumentosComponent},
  {path:'detalles-repo' ,component:DetallesReposisionComponent},
  {path:'orden-pedido' ,component:OrdenPedidoComponent},
  {path:'**' ,component:LoginComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
