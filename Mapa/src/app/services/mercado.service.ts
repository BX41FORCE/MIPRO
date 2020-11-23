import { Mercados } from '../models/mercado';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//importación del enviroment para uso de la URL del servidor
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MercadoService {
  //Uso de URL del servidor, Direccioado a la consulta de Mercados.
  url = environment.url + '/mercados';
  constructor(private http: HttpClient) { }
  //Función para consultar todos los Mercados.
  getAllMercados() {
    return this.http.get(this.url + '/get').toPromise().then(r => {
      return r;
    }).catch(e => {
      return e.body;
    });
  }
}
