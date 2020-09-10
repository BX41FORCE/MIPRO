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
  mercados: any = [];
  constructor(private json: UsuarioService, private mercadoService: MercadoService) {
  }
  verMercados1() {
    // this.json.getJson('http://localhost:3000/api/users').subscribe(responseDato => this.datos = responseDato);
    this.json.getJson('http://localhost:3000/api/mercados/get').subscribe((res: any) => {
      this.mercados = res;
      console.log(this.mercados[0]);
    });
  }
  verMercados() {
    this.mercadoService.getAllMercados().then(respuesta => {
      this.mercados = respuesta;
      console.log(this.mercados);
    }).catch(error => {
      console.log('Aun no hay datos!', 'Oops algo ha salido mal!');
    });
  }
  ngOnInit(): void {
    (mapboxgl as any).accessToken = environment.mapbox.accessToken;
    var map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 5.71,
      center: [this.lng, this.lat]
    });
    map.addControl(new mapboxgl.NavigationControl());
    this.verMercados();
    //this.verMercados1();
    //console.log(this.mercados.length);
    this.cargarMapa(map);
  }

  cargarMapa(map) {
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
    /*for (var i = 0; i == this.mercados.length; i++) {
      alert(this.mercados.length);
      alert('hola');
    }*/
    var mercados = {
      type: 'FeatureCollection',
      features: [
        { type: 'Feature', properties: { Name: 'Museo de la Ciudad', Address: '2250 Leestown Rd' }, geometry: { type: 'Point', coordinates: [-78.514997, -0.222806] } },
        /*{ type: 'Feature', properties: { Name: 'Museo del Carmen Alto', Address: '150 N Eagle Creek Dr' }, geometry: { type: 'Point', coordinates: [-78.515170, -0.222760] } },
        { type: 'Feature', properties: { Name: 'Museo Casa de Sucre', Address: '1740 Nicholasville Rd' }, geometry: { type: 'Point', coordinates: [-78.513209, -0.221853] } },
        { type: 'Feature', properties: { Name: 'Museo del Pasillo', Address: '1101 Veterans Dr' }, geometry: { type: 'Point', coordinates: [-78.514189, -0.221927] } },
        { type: 'Feature', properties: { Name: 'Museo Numismático Banco Central del Ecuador', Address: '1900 Richmond Rd' }, geometry: { type: 'Point', coordinates: [-78.513861, -0.221174] } },
        { type: 'Feature', properties: { Name: 'Museo de Arte Precolombino Casa de Alabado', Address: '627 W Fourth St' }, geometry: { type: 'Point', coordinates: [-78.515808, -0.221240] } },
        { type: 'Feature', properties: { Name: 'Museo Manuela Sáenz', Address: '2050 Versailles Rd' }, geometry: { type: 'Point', coordinates: [-78.510471, -0.222699] } },
        { type: 'Feature', properties: { Name: 'Museo Archivo de Arquitectura Ecuatoriana', ADDRESS: '1 St Joseph Dr' }, geometry: { type: 'Point', coordinates: [-78.509530, -0.223225] } }*/
      ]
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
          'icon-image': 'museum-15',
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