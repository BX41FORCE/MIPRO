import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//importación del enviroment para uso de la URL del servidor
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  //Uso de URL del servidor, Direccioado a la consulta de Hoteles
  url = environment.url + '/hoteles';
  constructor(private http: HttpClient) { }
  //Función para consultar todos los hoteles.
  getAllHoteles() {
    return this.http.get(this.url + '/get').toPromise().then(r => {
      return r;
    }).catch(e => {
      return e.body;
    });
  }
}
