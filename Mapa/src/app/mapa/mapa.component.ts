import { Component, OnInit } from '@angular/core';

//Importación del enviroment para uso del token de mapbox.
import { environment } from '../../environments/environment';

//Importación de Módulo para la generación del mapa.
import * as mapboxgl from 'mapbox-gl';

//Importación de Módulo para la generación de alertas.
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  //Uso de mapbox
  map: mapboxgl.Map;

  //Uso de un estilo específico creado en mapbox.
  style = 'mapbox://styles/bx41force/ck7m2bd88j2341iqho0jblnpz';

  //Coordenadas iniciales del mapa (Posicionamiento al cargar).
  lat = -1.6398488;
  lng = -83.3034775;

  constructor(private toastr: ToastrService) {

  }
  ngOnInit(): any {

    //Uso del token para el generar el mapa.
    (mapboxgl as any).accessToken = environment.mapbox.accessToken;

    //Creación del mapa de mapbox.
    var map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 5.4,
      center: [this.lng, this.lat]
    });

    //Adición de controles de navegación para el mapa.
    map.addControl(new mapboxgl.NavigationControl());
    map.addControl(new mapboxgl.FullscreenControl());

    //Generación de alerta.
    this.toastr.success('', 'Mapa Cargado');
  }
}