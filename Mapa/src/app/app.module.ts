import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapaComponent } from './mapa/mapa.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';

import { UsuarioService } from './services/usuario.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
//import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';



import { SidebarModule } from 'ng-sidebar';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ChartsModule } from 'ng2-charts';
import { MapaHotelComponent } from './mapa-hotel/mapa-hotel.component';
import { MapaMercadoComponent } from './mapa-mercado/mapa-mercado.component';
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
  providers: [UsuarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
