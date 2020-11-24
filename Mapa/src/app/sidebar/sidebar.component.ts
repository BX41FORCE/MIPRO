import { Component, OnInit,} from '@angular/core';
//Importación del Sistema de Rutas para navegar entre las diferentes vistas. 
import { Router } from '@angular/router';
//Importación de Librería para mostrar notificaciones web. 
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
//Variable para el funcionamiento del Sidebar.
  opened: boolean = true;


  constructor(private router: Router, private toastr: ToastrService) { }
  ngOnInit(): void {
  }
//Método para el funcionamiento del Sidebar.
  toggleOpened(): void {
    this.opened = !this.opened;
  }
//Variables globales para su uso en funciones.
  mostrarhoteles: boolean;

  seleccionNivel1 = 0;
  seleccionNivel2 = 0;
  seleccionNivel3 = 0;

  opcionesNivel2 = [];
  opcionesNivel3 = [];

//Métodos para el funcionamiento de los Niveles en Sidebar.
  onSelectNivel1(primerNivel_id: number) {
    this.seleccionNivel1 = primerNivel_id;
    this.seleccionNivel2 = 0;
    this.seleccionNivel3 = 0;
    this.opcionesNivel3 = [];
    this.opcionesNivel2 = this.getSegundoNivel().filter((item) => {
      return item.primerNivel_id === Number(primerNivel_id)
    });
  }

  onSelectNivel2(segundoNivel_id: number) {
    this.seleccionNivel2 = segundoNivel_id;
    this.seleccionNivel3 = 0;
    this.opcionesNivel3 = this.getTercerNivel().filter((item) => {
      return item.segundoNivel_id === Number(segundoNivel_id)
    });
  }

  onSelectNivel3(id: number) {
    this.seleccionNivel3 = id;
  }

  //Métodos para obtener valores en los Niveles de Sidebar.
  getPrimerNivel() {
    return [
      { id: 1, name: 'Sector Agroindustrial' },
      { id: 2, name: 'Sector Textil' },
      { id: 3, name: 'Eventos de Intercambio' }
    ];
  }

  getSegundoNivel() {
    return [
      { id: 1, primerNivel_id: 1, name: 'Comercializadoras' },
      { id: 2, primerNivel_id: 1, name: 'Concentración de empresas agro pesca y silvicultura' },
      { id: 3, primerNivel_id: 1, name: 'Concentración de empresas agroindustriales' },
      { id: 4, primerNivel_id: 1, name: 'Distribución productores pecuarios y actividades relacionadas' },
      { id: 5, primerNivel_id: 2, name: 'Comercializadoras' },
      { id: 6, primerNivel_id: 3, name: 'Próximos Eventos' },
      { id: 7, primerNivel_id: 3, name: 'Boletín 10 de junio' },
    ]
  }

  getTercerNivel() {
    return [
      { id: 1, segundoNivel_id: 1, name: 'Mercados Municipales IUO' },
      { id: 2, segundoNivel_id: 1, name: 'Cadenas de Supermercados y Minimarkets' },
      { id: 3, segundoNivel_id: 1, name: 'Demanda de Productos (Alojamientos)' },
      { id: 4, segundoNivel_id: 1, name: 'Restaurantes' },
      { id: 5, segundoNivel_id: 1, name: 'Bares' },
      { id: 6, segundoNivel_id: 1, name: 'Tiendas y Supermercados Minoristas' },
      { id: 7, segundoNivel_id: 5, name: 'Mayoristas' },
      { id: 8, segundoNivel_id: 5, name: 'Minoristas' },
    ]
  }

  //Métodos filtro para comparar y asignar vistas de los Mapas.
  obtenerObjeto() {
    if (this.seleccionNivel1 == 1 && this.seleccionNivel2 == 1 && this.seleccionNivel3 == 1) {
      //Navegación a la vista de Mercados.
      this.router.navigate(['mapaMercado']);
      //Refrescar los Niveles en Sidebar.
      this.seleccionNivel1 = 0;
      this.seleccionNivel2 = 0;
      this.seleccionNivel3 = 0;
    }
    else if (this.seleccionNivel1 == 1 && this.seleccionNivel2 == 1 && this.seleccionNivel3 == 3) {
      //Navegación a la vista de Hoteles
      this.router.navigate(['mapaHotel']);
      //Refrescar los Niveles en Sidebar.
      this.seleccionNivel1 = 0;
      this.seleccionNivel2 = 0;
      this.seleccionNivel3 = 0;
    }
    else if (this.seleccionNivel1 == 0 && this.seleccionNivel2 == 0 && this.seleccionNivel3 == 0) {
      //Navegación a la vista de Mapa Principal en caso de no realizar ninguna seleccion en los niveles.
      this.router.navigate(['']);

    }
    else {
      //Alerta
      this.toastr.warning('', 'Data no disponible');
    }
  }
}
