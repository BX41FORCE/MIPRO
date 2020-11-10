import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import * as mapboxgl from 'mapbox-gl';
import { UsuarioService } from '../services/usuario.service';
import { Mercados } from '../models/mercado';
import { MercadoService } from '../services/mercado.service';
import { HotelService } from '../services/hotel.service';

import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

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
  subfiltro = 1;

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: ChartType = 'horizontalBar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series C' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series D' },
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series E' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series F' }
  ];

  constructor(private json: UsuarioService, private mercadoService: MercadoService, private hotelService: HotelService) {

  }
  ngOnInit(): any {
    (mapboxgl as any).accessToken = environment.mapbox.accessToken;
    /*var map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 5.71,
      center: [this.lng, this.lat]
    });
    map.addControl(new mapboxgl.NavigationControl());*/
    //this.verMercados();
    this.verHoteles();
  }

  verHoteles() {
    var map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 10.25,
      center: [-78.5352221, -0.3073795],
      pitch: 90,
      bearing: 0,
      antialias: true
    });
    map.addControl(new mapboxgl.NavigationControl());
    map.addControl(new mapboxgl.FullscreenControl());
    this.hotelService.getAllHoteles().then(respuesta => {
      this.hoteles = respuesta;
      this.cargarHotelesEnMapa(map, this.hoteles);
    }).catch(error => {
      console.log('Aun no hay datos!', 'Oops algo ha salido mal!');
    });
  }

  subFiltroFuncion(value) {
    if (value == '1' && this.subfiltro == 1) {
      this.subfiltro = 2;
    } else if (value == '1' && this.subfiltro == 2) {
      this.subfiltro = 1;
    }
  }


  verMercados() {
    var map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 5.71,
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


  cargarHotelesEnMapa(map, datos) {
    var cadena = [];
    datos.forEach(element => {
      var icono = "";
      switch (element.categoria) {
        case "1 Estrella":
          icono = "hotel-1"
          break;
        case "2 Estrellas":
          icono = "hotel-2"
          break;
        case "3 Estrellas":
          icono = "hotel-3"
          break;
        case "4 Estrellas":
          icono = "hotel-4"
          break;
        case "5 Estrellas":
          icono = "hotel-5"
          break;
        default:
          icono = "residencia"
      };
      cadena.push({
        type: 'Feature', properties:
        {
          Hotel: "<style> #hotel_popup {background-color: white; width: auto; height: 250px; overflow: auto; } ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: #f1f1f1;} ::-webkit-scrollbar-thumb {background: #193b68; } ::-webkit-scrollbar-thumb:hover { background: #3893e6; }</style>" +
            "<div id='hotel_popup'>" +
            "<p>Nombre: </strong>" + "</p>" +
            "<p><strong>" + element.nombre + "</strong></p>" +
            "<p>Categoría:</p>" +
            "<p><strong>" + element.categoria + "</strong></p>" +
            "<p style='color:#3893e6;'><strong>VALOR MENSUAL GASTADOS EN:</strong></p>" +
            "<p>Preparados conservas de pescado y de otras especies acuáticas</p>" +
            "<p><strong>$ " + element.preparados_conservas_de_pescado_y_de_otras_especies_acuaticas + "</strong></p>" +
            "<p>Pescado y otros productos acuaticos elaborados</p>" +
            "<p><strong>$ " + element.pescado_y_otros_productos_acuaticos_elaborados + "</strong></p>" +
            "<p>Carne productos de carne subproductos</p>" +
            "<p><strong>$ " + element.carne_productos_de_carne_subproductos + "</strong></p>" +
            "<p>Tuberculos vegetales y frutas</p>" +
            "<p><strong>$ " + element.tuberculos_vegetales_melones_y_frutas + "</strong></p>" +
            "<p>Productos de panaderia</p>" +
            "<p><strong>$ " + element.productos_de_panaderia + "</strong></p>" +
            "<p>Bebidas alcoholicas</p>" +
            "<p><strong>$ " + element.bebidas_alcoholicas + "</strong></p>" +
            "<p>Flores y capullos</p>" +
            "<p><strong>$ " + element.flores_y_capullos + "</strong></p>" +
            "<p>Fideos macarrones y otros productos farinaceos similares</p>" +
            "<p><strong>$ " + element.fideos_macarrones_y_otros_productos_farinaceos_similares + "</strong></p>" +
            "<p>Productos lacteos elaborados</p>" +
            "<p><strong>$ " + element.productos_lacteos_elaborados + "</strong></p>" +
            "<p>Cacao elaborado chocolate y productos de confiteria</p>" +
            "<p><strong>$ " + element.cacao_elaborado_chocolate_y_productos_de_confiteria + "</strong></p>" +
            "<p>Productos de café elaborado</p>" +
            "<p><strong>$ " + element.productos_de_cafe_elaborado + "</strong></p>"
            + "</div>",
          icon: icono
        }, geometry: { type: 'Point', coordinates: [element.longitud, element.latitud] }
      });
    });

    var hoteles = {
      type: 'FeatureCollection',
      features: [] = cadena
    };

    map.on('load', function () {
      map.loadImage(
        '../../assets/hotel_icon/1 Estrella.png',
        function (error, image) {
          if (error) throw error;
          map.addImage('hotel-1', image);
        });
      map.loadImage(
        '../../assets/hotel_icon/2 Estrellas.png',
        function (error, image) {
          if (error) throw error;
          map.addImage('hotel-2', image);
        });
      map.loadImage(
        '../../assets/hotel_icon/3 Estrellas.png',
        function (error, image) {
          if (error) throw error;
          map.addImage('hotel-3', image);
        });
      map.loadImage(
        '../../assets/hotel_icon/4 Estrellas.png',
        function (error, image) {
          if (error) throw error;
          map.addImage('hotel-4', image);
        });
      map.loadImage(
        '../../assets/hotel_icon/5 Estrellas.png',
        function (error, image) {
          if (error) throw error;
          map.addImage('hotel-5', image);
        });
      map.loadImage(
        '../../assets/hotel_icon/residencia.png',
        function (error, image) {
          if (error) throw error;
          map.addImage('residencia', image);
        });
      map.addLayer({
        id: 'hoteles',
        type: 'symbol',
        source: {
          type: 'geojson',
          data: hoteles
        },
        layout: {
          'icon-image': '{icon}',
          'icon-allow-overlap': true,
          'icon-size': 0.1
        },
        paint: {
        }
      });
    });
    var popup = new mapboxgl.Popup();

    map.on('click', function (e) {
      var features = map.queryRenderedFeatures(e.point, { layers: ['hoteles'] });
      if (!features.length) {
        popup.remove();
        return;
      }
      var feature = features[0];

      popup.setLngLat(feature.geometry.coordinates)
        .setHTML(feature.properties.Hotel)
        .addTo(map);
      map.getCanvas().style.cursor = features.length ? 'pointer' : '';
    });
  }
}