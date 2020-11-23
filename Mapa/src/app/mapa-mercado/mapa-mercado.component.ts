import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import * as mapboxgl from 'mapbox-gl';

//Importación del Servicio de Mercados.
import { MercadoService } from '../services/mercado.service';

//Importación del módulo para las alertas
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-mapa-mercado',
  templateUrl: './mapa-mercado.component.html',
  styleUrls: ['./mapa-mercado.component.css']
})
export class MapaMercadoComponent implements OnInit {
   
  //Uso de mapbox
  map: mapboxgl.Map;

  //Uso de un estilo específico creado en mapbox.
  style = 'mapbox://styles/bx41force/ck7m2bd88j2341iqho0jblnpz';

  //Coordenadas iniciales del mapa (Posicionamiento al cargar).
  lat = -0.304947;
  lng = -78.4718792;

  //Variables globales para su uso en funciones.
  mercados = [];

  constructor(private mercadoService: MercadoService, private toastr: ToastrService) {

  }
  ngOnInit(): any {

    //Uso del token para el generar el mapa.
    (mapboxgl as any).accessToken = environment.mapbox.accessToken;

    //Ejecución de Función Principal
    this.verMercados();
  }
  verMercados() {
    //Generación del mapa
    var map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 8,
      center: [this.lng, this.lat]
    });
    map.addControl(new mapboxgl.NavigationControl());
    map.addControl(new mapboxgl.FullscreenControl());

    //Uso del servicio para traer los datos.
    this.mercadoService.getAllMercados().then(respuesta => {
      this.mercados = respuesta;

       //Ejecución de función secundaria
      this.cargarMercadosEnMapa(map, this.mercados);

      //Alerta
      this.toastr.success('', 'Consulta Exitosa');

    }).catch(error => {

      //Alerta en caso de Error
      this.toastr.error('Data No Encontrada', 'Oops algo ha salido mal!');
      alert('Oops algo ha salido mal!\nData No Encontrada');

    });
  }

//Función de despliegue de los layers en el mapa
  cargarMercadosEnMapa(map, datos) {
    var cadena = [];

    //Depuración de los datos para ser utilizados.
    datos.forEach(element => {
      cadena.push({ type: 'Feature', properties: { Name:"<p></p><strong>"+ element.nombre+"</strong><p></p>" }, geometry: { type: 'Point', coordinates: [element.longitud, element.latitud] } },);
    });

    //Uso de los datos depurados
    var mercados = {
      type: 'FeatureCollection',
      features: [] = cadena
    };

    //Generación de layer según el dato depurado
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
    
    //Opciones generales del PopUp
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
