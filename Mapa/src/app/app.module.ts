import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Módulo utilizado para la comunicación con el servidor
import { HttpClientModule } from '@angular/common/http';

//Componentes de las páginas
import { NavbarComponent } from './navbar/navbar.component'; 
import { MapaComponent } from './mapa/mapa.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MapaHotelComponent } from './mapa-hotel/mapa-hotel.component';
import { MapaMercadoComponent } from './mapa-mercado/mapa-mercado.component';
import { FooterComponent } from './footer/footer.component';

//Módulos usados para funciones especiales en el proyecto

//Módulo para el sidebar (Visualización de barra lateral)
import { SidebarModule } from 'ng-sidebar';
//Módulo usado para la creación de los Gráficos Estadísticos
import { ChartsModule } from 'ng2-charts';
//Módulo usado para las alertas de carga
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    MapaComponent,
    NavbarComponent,
    FooterComponent,
    SidebarComponent,
    MapaHotelComponent,
    MapaMercadoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    SidebarModule.forRoot(),
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
