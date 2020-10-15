import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import * as mapboxgl from 'mapbox-gl';
import { UsuarioService } from '../services/usuario.service';
import { Mercados } from '../models/mercado';
import { MercadoService } from '../services/mercado.service';
import { HotelService } from '../services/hotel.service';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  map: mapboxgl.Map;
  style = 'mapbox://styles/bx41force/ck7m2bd88j2341iqho0jblnpz';
  lat = -1.720;
  lng = -79.666;
  mercados = [];
  hoteles = [];
  constructor(private json: UsuarioService, private mercadoService: MercadoService, private hotelService: HotelService) {
    this.verMercados();
    this.verHoteles();
  }
  ngOnInit(): any {

  }

  verHoteles() {
    this.hotelService.getAllHoteles().then(respuesta => {
      this.hoteles = respuesta;
      console.log(this.hoteles);
    }).catch(error => {
      console.log('Aun no hay datos!', 'Oops algo ha salido mal!');
    });
  }

  verMercados() {
    this.mercadoService.getAllMercados().then(respuesta => {
      this.mercados = respuesta;
      console.log(this.mercados);
      (mapboxgl as any).accessToken = environment.mapbox.accessToken;
      var map = new mapboxgl.Map({
        container: 'map',
        style: this.style,
        zoom: 5.71,
        center: [this.lng, this.lat]
      });
      map.addControl(new mapboxgl.NavigationControl());
      this.cargarMapa(map, respuesta);
    }).catch(error => {
      console.log('Aun no hay datos!', 'Oops algo ha salido mal!');
    });
  }
  cargarMapa(map, datos) {
    var cadena = [];
    datos.forEach(element => {
      cadena.push({ type: 'Feature', properties: { Name: element.nombre }, geometry: { type: 'Point', coordinates: [element.longitud, element.latitud] } },);
    });

    var mercados = {
      type: 'FeatureCollection',
      features: [] = cadena
    };

    map.on('load', function () {
      map.addLayer({
        id: 'mercados',
        type: 'symbol',
        source: {
          type: 'geojson',
          data: mercados
        },
        layout: {
          'icon-image': 'convenience-15',
          'icon-allow-overlap': true
        },
        paint: {
        }
      });
    });
    var popup = new mapboxgl.Popup();

    map.on('mousemove', function (e) {
      var features = map.queryRenderedFeatures(e.point, { layers: ['mercados'] });
      if (!features.length) {
        popup.remove();
        return;
      }
      var feature = features[0];

      popup.setLngLat(feature.geometry.coordinates)
        .setHTML(feature.properties.Name)
        .addTo(map);

      map.getCanvas().style.cursor = features.length ? 'pointer' : '';
    });
  }
}