import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import * as mapboxgl from 'mapbox-gl';
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
  constructor() { }

  ngOnInit(): void {

    (mapboxgl as any).accessToken = environment.mapbox.accessToken;
     var map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 5.71,
      center: [this.lng, this.lat]
    });
    map.addControl(new mapboxgl.NavigationControl());
    var museums = {
      type: 'FeatureCollection',
      features: [
        { type: 'Feature', properties: { Name: 'Museo de la Ciudad', Address: '2250 Leestown Rd' }, geometry: { type: 'Point', coordinates: [-78.514997, -0.222806] } },
        { type: 'Feature', properties: { Name: 'Museo del Carmen Alto', Address: '150 N Eagle Creek Dr' }, geometry: { type: 'Point', coordinates: [-78.515170, -0.222760] } },
        { type: 'Feature', properties: { Name: 'Museo Casa de Sucre', Address: '1740 Nicholasville Rd' }, geometry: { type: 'Point', coordinates: [-78.513209, -0.221853] } },
        { type: 'Feature', properties: { Name: 'Museo del Pasillo', Address: '1101 Veterans Dr' }, geometry: { type: 'Point', coordinates: [-78.514189, -0.221927] } },
        { type: 'Feature', properties: { Name: 'Museo Numismático Banco Central del Ecuador', Address: '1900 Richmond Rd' }, geometry: { type: 'Point', coordinates: [-78.513861, -0.221174] } },
        { type: 'Feature', properties: { Name: 'Museo de Arte Precolombino Casa de Alabado', Address: '627 W Fourth St' }, geometry: { type: 'Point', coordinates: [-78.515808, -0.221240] } },
        { type: 'Feature', properties: { Name: 'Museo Manuela Sáenz', Address: '2050 Versailles Rd' }, geometry: { type: 'Point', coordinates: [-78.510471, -0.222699] } },
        { type: 'Feature', properties: { Name: 'Museo Archivo de Arquitectura Ecuatoriana', ADDRESS: '1 St Joseph Dr' }, geometry: { type: 'Point', coordinates: [-78.509530, -0.223225] } }
      ]
    };
    var libraries = {
      type: 'FeatureCollection',
      features: [
        { type: 'Feature', properties: { Name: 'Village Branch', Address: '2185 Versailles Rd' }, geometry: { type: 'Point', coordinates: [-84.548369, 38.047876] } },
        { type: 'Feature', properties: { Name: 'Northside Branch', ADDRESS: '1733 Russell Cave Rd' }, geometry: { type: 'Point', coordinates: [-84.47135, 38.079734] } },
        { type: 'Feature', properties: { Name: 'Central Library', ADDRESS: '140 E Main St' }, geometry: { type: 'Point', coordinates: [-84.496894, 38.045459] } },
        { type: 'Feature', properties: { Name: 'Beaumont Branch', Address: '3080 Fieldstone Way' }, geometry: { type: 'Point', coordinates: [-84.557948, 38.012502] } },
        { type: 'Feature', properties: { Name: 'Tates Creek Branch', Address: '3628 Walden Dr' }, geometry: { type: 'Point', coordinates: [-84.498679, 37.979598] } },
        { type: 'Feature', properties: { Name: 'Eagle Creek Branch', Address: '101 N Eagle Creek Dr' }, geometry: { type: 'Point', coordinates: [-84.442219, 37.999437] } }
      ]
    };

    map.on('load', function () {
      map.addLayer({
        id: 'museums',
        type: 'symbol',
        source: {
          type: 'geojson',
          data: museums
        },
        layout: {
          'icon-image': 'museum-15',
          'icon-allow-overlap': true
        },
        paint: {}
      });
      map.addLayer({
        id: 'libraries',
        type: 'symbol',
        source: {
          type: 'geojson',
          data: libraries
        },
        layout: {
          'icon-image': 'library-15'
        },
        paint: {}
      });
    });
    var popup = new mapboxgl.Popup();

    map.on('mousemove', function (e) {
      var features = map.queryRenderedFeatures(e.point, { layers: ['museums', 'libraries'] });
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
