import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import * as mapboxgl from 'mapbox-gl';
import { MercadoService } from '../services/mercado.service';


@Component({
  selector: 'app-mapa-mercado',
  templateUrl: './mapa-mercado.component.html',
  styleUrls: ['./mapa-mercado.component.css']
})
export class MapaMercadoComponent implements OnInit {
  map: mapboxgl.Map;
  style = 'mapbox://styles/bx41force/ck7m2bd88j2341iqho0jblnpz';
  lat = -0.304947;
  lng = -78.4718792;
  mercados = [];

  constructor(private mercadoService: MercadoService) {

  }
  ngOnInit(): any {
    (mapboxgl as any).accessToken = environment.mapbox.accessToken;
    this.verMercados();
  }
  verMercados() {
    var map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 8,
      center: [this.lng, this.lat]
    });
    map.addControl(new mapboxgl.NavigationControl());
    this.mercadoService.getAllMercados().then(respuesta => {
      this.mercados = respuesta;
      this.cargarMercadosEnMapa(map, this.mercados);
    }).catch(error => {
      console.log('Aun no hay datos!', 'Oops algo ha salido mal!');
    });
  }

  cargarMercadosEnMapa(map, datos) {
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
