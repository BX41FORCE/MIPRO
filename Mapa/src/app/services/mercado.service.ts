import { Mercados } from '../models/mercado';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MercadoService {
  url = environment.url + '/mercados';
  constructor(private http: HttpClient) { }
  getAllMercados() {
    return this.http.get(this.url + '/get').toPromise().then(r => {
      return r;
    }).catch(e => {
      return e.body;
    });
  }
}
