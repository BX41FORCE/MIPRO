import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  opened: boolean = true;
  constructor() { }
  ngOnInit(): void {
  }

  toggleOpened(): void {
    this.opened = !this.opened;
  }

  seleccionNivel1 = 0;
  seleccionNivel2 = 0;

  opcionesNivel2 = [];
  opcionesNivel3 = [];


  onSelectNivel1(primerNivel_id: number) {
    this.seleccionNivel1 = primerNivel_id;
    this.seleccionNivel2 = 0;
    this.opcionesNivel3 = [];
    this.opcionesNivel2 = this.getSegundoNivel().filter((item) => {
    return item.primerNivel_id === Number(primerNivel_id)
    });
    }
     
    onSelectNivel2(segundoNivel_id: number) {
    this.seleccionNivel2 = segundoNivel_id;
    this.opcionesNivel3 = this.getTercerNivel().filter((item) => {
    return item.segundoNivel_id === Number(segundoNivel_id)
    });
    }
     
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
    
}