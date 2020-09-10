import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import * as mapboxgl from 'mapbox-gl';
import { UsuarioService } from '../services/usuario.service';
import { Mercados } from '../models/mercado';
import { MercadoService } from '../services/mercado.service';

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
  constructor(private json: UsuarioService, private mercadoService: MercadoService) {
    this.verMercados();
  }
  ngOnInit(): any {

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
    /*
         var hoveredStateId = null;
     
         map.on('load', function () {
           map.addSource('states', {
             'type': 'geojson',
             'data':
               '../../assets/data/provincias.geojson'
           });
     
           // The feature-state dependent fill-opacity expression will render the hover effect
           // when a feature's hover state is set to true.
           map.addLayer({
             'id': 'state-fills',
             'type': 'fill',
             'source': 'states',
             'layout': {},
             'paint': {
               'fill-color': '#193b68',
               'fill-opacity': [
                 'case',
                 ['boolean', ['feature-state', 'hover'], false],
                 1,
                 0.5
               ]
             }
           });
     
           map.addLayer({
             'id': 'state-borders',
             'type': 'line',
             'source': 'states',
             'layout': {},
             'paint': {
               'line-color': '#627BC1',
               'line-width': 2
             }
           });
     
           // When the user moves their mouse over the state-fill layer, we'll update the
           // feature state for the feature under the mouse.
           map.on('mousemove', 'state-fills', function (e) {
             if (e.features.length > 0) {
               if (hoveredStateId) {
                 map.setFeatureState(
                   { source: 'states', id: hoveredStateId },
                   { hover: false }
                 );
               }
               hoveredStateId = e.features[0].id;
               map.setFeatureState(
                 { source: 'states', id: hoveredStateId },
                 { hover: true }
               );
             }
           });
         });
     */
    var cadena = [];

    datos.forEach(element => {
      cadena.push({ type: 'Feature', properties: { Name: element.nombre }, geometry: { type: 'Point', coordinates: [element.longitud, element.latitud] } });
    });

    var mercados = {
      type: 'FeatureCollection',
      features: [cadena[0],cadena[1],cadena[2]/*cadena.slice(0)*/]
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
        paint: {}
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