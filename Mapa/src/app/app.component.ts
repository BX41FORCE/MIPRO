import { Component } from '@angular/core';
import { UsuarioService } from './services/usuario.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Mapa';
  datos;
  constructor(public json: UsuarioService) {
    this.json.getJson('http://localhost:3000/api/users').subscribe(responseDato => this.datos = responseDato);
  }
}
