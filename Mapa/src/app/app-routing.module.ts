import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapaHotelComponent } from './mapa-hotel/mapa-hotel.component';
import { MapaComponent } from './mapa/mapa.component'
import { MapaMercadoComponent } from './mapa-mercado/mapa-mercado.component'

const routes: Routes = [{ path: 'mapa', component: MapaComponent },
{ path: 'mapaHotel', component: MapaHotelComponent },
{ path: 'mapaMercado', component: MapaMercadoComponent },
{ path: '', component: MapaComponent},
{ path: '**', redirectTo: 'mapa', pathMatch: 'full' },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
