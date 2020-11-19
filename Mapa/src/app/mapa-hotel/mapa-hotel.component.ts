import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import * as mapboxgl from 'mapbox-gl';
import { HotelService } from '../services/hotel.service';

import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-mapa-hotel',
  templateUrl: './mapa-hotel.component.html',
  styleUrls: ['./mapa-hotel.component.css']
})
export class MapaHotelComponent implements OnInit {
  map: mapboxgl.Map;
  style = 'mapbox://styles/bx41force/ck7m2bd88j2341iqho0jblnpz';
  lat = -1.720;
  lng = -79.666;
  hoteles = [];
  hotelesTotal = 0;
  subfiltro = 1;
  calculoBarchart1 = 0;
  calculoBarchart2 = 0;
  calculoBarchart3 = 0;
  calculoBarchart4 = 0;
  calculoBarchart5 = 0;
  calculoBarchart6 = 0;
  calculoBarchart7 = 0;
  calculoBarchart8 = 0;
  calculoBarchart9 = 0;
  calculoBarchart10 = 0;
  calculoBarchart11 = 0;
  datosBarchart = [];
  mostrar = true;

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['2020',];
  public barChartType: ChartType = 'horizontalBar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
  ];

  constructor(private hotelService: HotelService, private toastr: ToastrService) {

  }
  ngOnInit(): any {
    (mapboxgl as any).accessToken = environment.mapbox.accessToken;
    this.verHoteles();
  }
  chartHotel() {
    this.hotelService.getAllHoteles().then(respuesta => {
      this.hoteles = respuesta;
      respuesta.forEach(element => {
        if (element.longitud != "" && element.latitud != "") {
          this.calculoBarchart1 = parseInt(element.preparados_conservas_de_pescado_y_de_otras_especies_acuaticas) + this.calculoBarchart1;
          this.calculoBarchart2 = parseInt(element.pescado_y_otros_productos_acuaticos_elaborados) + this.calculoBarchart2;
          this.calculoBarchart3 = parseInt(element.carne_productos_de_carne_subproductos) + this.calculoBarchart3;
          this.calculoBarchart4 = parseInt(element.tuberculos_vegetales_melones_y_frutas) + this.calculoBarchart4;
          this.calculoBarchart5 = parseInt(element.productos_de_panaderia) + this.calculoBarchart5;
          this.calculoBarchart6 = parseInt(element.bebidas_alcoholicas) + this.calculoBarchart6;
          this.calculoBarchart7 = parseInt(element.flores_y_capullos) + this.calculoBarchart7;
          this.calculoBarchart8 = parseInt(element.fideos_macarrones_y_otros_productos_farinaceos_similares) + this.calculoBarchart8;
          this.calculoBarchart9 = parseInt(element.productos_lacteos_elaborados) + this.calculoBarchart9;
          this.calculoBarchart10 = parseInt(element.cacao_elaborado_chocolate_y_productos_de_confiteria) + this.calculoBarchart10;
          this.calculoBarchart11 = parseInt(element.productos_de_cafe_elaborado) + this.calculoBarchart11;
          this.hotelesTotal = 1 + this.hotelesTotal;
        }
      })
      this.chart(this.calculoBarchart1,
        this.calculoBarchart2, this.calculoBarchart3, this.calculoBarchart4, this.calculoBarchart5,
        this.calculoBarchart6, this.calculoBarchart7, this.calculoBarchart8, this.calculoBarchart9,
        this.calculoBarchart10, this.calculoBarchart11);
    })
  }

  chart(value1, value2, value3, value4, value5, value6, value7, value8, value9, value10, value11) {
    this.datosBarchart = [{ data: [value1,], label: 'Derivados Acuáticos' },
    { data: [value2], label: 'Pescado y Elaborados' },
    { data: [value3], label: 'Carne y Subproductos' },
    { data: [value4], label: 'Vegetales y Frutas' },
    { data: [value5], label: 'Panadería y Derivados' },
    { data: [value6], label: 'Bebidas Alcohólicas' },
    { data: [value7], label: 'Flores y Capullos' },
    { data: [value8], label: 'Fideos y Similares' },
    { data: [value9], label: 'Lácteos Elaborados' },
    { data: [value10], label: 'Cacao y Confitería' },
    { data: [value11], label: 'Elaborados de Café' },]
    this.barChartData = this.datosBarchart;
  }

  verHoteles() {
    this.chartHotel();
    var map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 10.25,
      center: [-78.5352221, -0.4073795],
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
      this.toastr.error('Data No Encontrada', 'Oops algo ha salido mal!');
    });
  }

  subFiltroFuncion(value) {
    if (value == '1' && this.subfiltro == 1) {
      this.subfiltro = 2;
    } else if (value == '1' && this.subfiltro == 2) {
      this.subfiltro = 1;
    }
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
      map.addSource('hoteles', {
        type: 'geojson',
        url: 'mapbox://mapbox.2opop9hr'
      });
      map.addLayer({
        id: 'hoteles',
        type: 'symbol',
        source: {
          type: 'geojson',
          data: hoteles
        },
        layout: {
          'visibility': 'visible',
          'icon-image': '{icon}',
          'icon-allow-overlap': true,
          'icon-size': 0.1
        },
        paint: {
        },
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



    var toggleableLayerIds = ['hoteles'];
    for (var i = 0; i < toggleableLayerIds.length; i++) {
      var id = toggleableLayerIds[i];

      var link = document.createElement('button');
      link.textContent = '\uD83C\uDFE8 Ocultar Hoteles';
      link.className = 'btn btn-outline-primary btn-sm btn-block';
      link.style.fontSize = "11px";
      link.style.marginTop = "20px";

      link.onclick = function (e) {
        var clickedLayer = id;
        e.preventDefault();
        e.stopPropagation();

        var visibility = map.getLayoutProperty(clickedLayer, 'visibility');

        // toggle layer visibility by changing the layout object's visibility property
        if (visibility === 'visible') {
          map.setLayoutProperty(clickedLayer, 'visibility', 'none');
          layers.className = '';
        } else {
          layers.className = 'active';
          map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
        }
      };
      var layers = document.getElementById('sub-filtro');
      layers.appendChild(link);
    }
  }

}
