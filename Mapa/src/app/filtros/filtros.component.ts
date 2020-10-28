import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { Query, DataManager } from '@syncfusion/ej2-data';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var $: any;
let miarray: number[] = [1,2,3,4,5];
class AsignarObjeto{
    color: [{
        OpcionesNivelUno:String, 
        PrimerId: String
    }]
    objeto1: {OpcionesNivelUno:String, PrimerId: String }[];
    objeto2: {OpcionesNivelDos:String, PrimerId: String, SegundoId: String }[];
    objeto3: {OpcionesNivelTres:String, SegundoId: String, TercerId:String }[];
}
@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.css']
})
export class FiltrosComponent implements OnInit {


  constructor(private fb: FormBuilder) { 
      this.createForm();
  }

  ngOnInit(): void {
    $(document).ready(function () {

      $('#sidebarCollapse').on('click', function () {
          $('#sidebar').toggleClass('active');
      });
  
  });
  }
  
    //definir los Datos DropdownList NIvel 1
    public DatosPrimerNivel: { [key: string]: Object }[] = [
      { OpcionesNivelUno: 'Sector Agroindustrial', PrimerId: '1' },
      { OpcionesNivelUno: 'Sector Textil', PrimerId: '2' },
      { OpcionesNivelUno: 'Eventos de Intercambio', PrimerId: '3' },
  ];
  //definir los Datos DropdownList NIvel 2
  public DatosSegundoNivel: { [key: string]: Object }[] = [
      { OpcionesNivelDos: 'Comercializadoras', PrimerId: '1', SegundoId: '100' },
      { OpcionesNivelDos: 'Concentración de empresas agro pesca y silvicultura ', PrimerId: '1', SegundoId: '101' },
      { OpcionesNivelDos: 'Concentración de empresas agroindustriales ', PrimerId: '1', SegundoId: '102' },
      { OpcionesNivelDos: 'Distribución productores pecuarios y actividades relacionadas ', PrimerId: '1', SegundoId: '103' },
      { OpcionesNivelDos: 'Comercializadoras', PrimerId: '2', SegundoId: '104' },
      { OpcionesNivelDos: 'Próximos Eventos ', PrimerId: '3', SegundoId: '105' },
      { OpcionesNivelDos: 'Boletín 10 de junio', PrimerId: '3', SegundoId: '106' }
  ];
  //definir los Datos DropdownList NIvel 3
  public DatosTercerNivel: { [key: string]: Object }[] = [
      { OpcionesNivelTres: 'Mercados Municipales IUO', SegundoId: '100', TercerId: 200 },
      { OpcionesNivelTres: 'Cadenas de Supermercados y Minimarkets ', SegundoId: '100', TercerId: 201 },
      { OpcionesNivelTres: 'Demanda de Productos (Alojamientos) ', SegundoId: '100', TercerId: 202 },
      { OpcionesNivelTres: 'Restaurantes ', SegundoId: '100', TercerId: 203 },
      { OpcionesNivelTres: 'Bares ', SegundoId: '100', TercerId: 204 },
      { OpcionesNivelTres: 'Tiendas y Supermercados Minoristas ', SegundoId: '100', TercerId: 205 },
      { OpcionesNivelTres: 'Mayoristas', SegundoId: '104', TercerId: 206 },
      { OpcionesNivelTres: 'Minoristas ', SegundoId: '104', TercerId: 207 }
  ];
  // asigna la columna apropiada a la propiedad de los campos para el DropdownList PrimerNivel
  public PrimerosCampos: Object = { text: 'OpcionesNivelUno', value: 'PrimerId' };
  // asigna la columna apropiada a la propiedad de los campos para el DropdownList Segundo Nivel
  public SegundosCampos: Object = { text: 'OpcionesNivelDos', value: 'SegundoId' };
  // asigna la columna apropiada a la propiedad de los campos para el DropdownList TercerNivel
  public TercerosCampos: Object = { text: 'OpcionesNivelTres', value: 'TercerId' };
  //establece el placeholder en la entrada del DropdownList PrimerNivel
  public marcaPrimerNivel: string = "Seleccionar";
  //establece el palceholder en la entrada del DropdownList SegundoNivel
  public marcaSegundoNivel: string = "Seleccionar";
  //establece el placeholder en la entrada del DropdownList TercerNivel
  public marcaTercerNivel: string = "Seleccionar";
  @ViewChild('PrimerNivel')
  public primerObj: DropDownListComponent;
  @ViewChild('SegundoNivel')
  public segundoObj: DropDownListComponent;
  @ViewChild('TercerNivel')
  public tercerObj: DropDownListComponent;
  public cambiosUno(): void {
      let tempQuery: Query = new Query().where('PrimerId', 'equal', this.primerObj.value);
      //Consulta la fuente de datos según el valor seleccionado de DropdownList PrimerNivel
      this.segundoObj.query = tempQuery;
      // habilita el DropdownList SegundoNivel
      this.segundoObj.enabled = true;
      //borra la selección existente
      this.segundoObj.text = null;
      //enlaza los cambios de propiedad a DropdownList SegundoNivel
      this.segundoObj.dataBind();
      //borra la selección existente en DropdownList TercerNivel
      this.tercerObj.text = null;
      //desactiva DropdownList TercerNivel
      this.tercerObj.enabled = false;
      //enlaza el cambio de propiedad a DropdownList TercerNivel
      this.tercerObj.dataBind();
  }
  public cambiosDos(): void {
      // consulta la fuente de datos según el valor seleccionado de DropdownList SegundoNivel 
      this.tercerObj.query = new Query().where('SegundoId', 'equal', this.segundoObj.value);
      // habilita DropdownList TercerNivel
      this.tercerObj.enabled = true;
      //borra la selección existente
      this.tercerObj.text = null;
      // enlaza el cambio de propiedad a DropdownList TercerNivel
      this.tercerObj.dataBind();
  }
  createForm() : void{
      this.skillForm = this.fb.group({
          skillname: ['', Validators.required],
          skillname2: ['', Validators.required],
          skillname3: ['', Validators.required],
          //skillname2: ['', Validators.required],
          //skillname3: ['', Validators.required]
      });
  }

  @Output()
  enviar: EventEmitter<string> = new EventEmitter<string>();

  obtenerObjeto(args){
    let AsignarObjeto = {
        OpcionesNivelUno: 'Sector Agroindustrial', 
        PrimerId: '1' 
    };
    
    let AsignarObjeto2 = {
        OpcionesNivelDos: 'Comercializadoras', 
        PrimerId: '1', 
        SegundoId: '100'
    };

    let AsignarObjeto3 = {
        OpcionesNivelTres: 'Mercados Municipales IUO', 
        SegundoId: '100', 
        TercerId: 200
    };
    var campoObjeto = this.primerObj.getDataByValue(this.skillForm.get(['skillname']).value);
    
   console.log(campoObjeto);

    var campoObjeto2 = this.segundoObj.getDataByValue(this.skillForm.get(['skillname2']).value);
    console.log(campoObjeto2);

    var campoObjeto3 = this.tercerObj.getDataByValue(this.skillForm.get(['skillname3']).value);
    console.log(campoObjeto3);
    
    if(JSON.stringify(AsignarObjeto) == JSON.stringify(campoObjeto)){
        JSON.stringify(AsignarObjeto2) == JSON.stringify(campoObjeto2)
    }
    if(JSON.stringify(AsignarObjeto3) == JSON.stringify(campoObjeto3)){
        this.enviar.emit("confirmado");
    }
   else {
        console.log("nel prro");
    }

    
}
skillForm: FormGroup;

}


