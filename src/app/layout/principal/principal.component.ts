import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Person } from '../../core/models/Archivo.models';
import { ServiceRestService } from '../../core/services/service-rest.service'
import { Busqueda } from '../../core/models/Optiones';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent {

  busqueda: number = 0;
  busquedaTipo: number = 0;
  busquedaFecha: Date;
  busquedaSerial: number;

  showTableType: boolean = false;
  optionsBusqueda: Array<Busqueda>;

  person : Person  ={
    id : null,
    name : null,
    lastName  : null,
    dni : null,
    employee : null,
  }

  active : Person[]=[];

  constructor(
    private serviceRestService: ServiceRestService,
    private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.getPersons();
  }

  cargarSelectCiclo() {
    this.optionsBusqueda = [
        {value: 1, busqueda: 'Id'},
        {value: 2, busqueda: 'Nombre'},
        {value: 2, busqueda: 'Apellido'},
    ]
  }

  getPersons(){
    this.serviceRestService.getAllPerson()
    .subscribe( data=>{
      this.active = data
    })

    this.serviceRestService.getAllPerson()
    .subscribe( data=>{
      this.active = data
    })

    console.log(this.person);
  }



  searchType(busquedaTipo : number){
    if(busquedaTipo == 1 || busquedaTipo == 2){
      alert("vas a consultar por Tipo");
      this.showTableType = true;
      console.log(this.busquedaTipo);
    }else{
      alert("por favor ingrese un tipo valido");
      this.showTableType = false;
      console.log(this.busquedaTipo);
    }

  }

  searchDate(){
    this.showTableType = false;
    alert("vas a consultar por fecha");
    console.log(this.busquedaFecha);
  }

  searchSerie(){
    this.showTableType = false;
    alert("vas a consultar por tipo "+ this.busquedaSerial);
    console.log(this.busquedaSerial);
  }

}
