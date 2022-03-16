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

  busquedaPersona: number;
  mostrarTablaPersonaPorID : boolean = false;
  mostrarTablaModificar : boolean = false;
  valorPresente : boolean = false;
  hayObjeto : boolean = false;

  idModifier : number;
  busqueda: number = 0;
  busquedaTipo: number = 0;
  busquedaFecha: Date;

  showTableType: boolean = false;
  optionsBusqueda: Array<Busqueda>;

  person : Person  ={
    id : null,
    name : null,
    lastName  : null,
    dni : null,
    employee : null,
  }

  enviarPerson : Person = {
    id:null,
    name : null,
    lastName : null,
    dni : null,
    employee : null,
  }

  persons : Person[]=[];
  personById : Person;

  constructor(
    private serviceRestService: ServiceRestService,
    private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.getPersons();
  }

  getPersons(){
    this.serviceRestService.getAllPerson()
    .subscribe(data=>{
      this.persons = data
    })
  }

  searchPerson(){
      this.serviceRestService.getPersonById(this.busquedaPersona)
      .subscribe(data => {
        this.personById = data
        this.mostrarTablaPersonaPorID = true;
        this.valorPresente = true;
      });
  }

  send(){
    if(this.enviarPerson !=null){
      this.serviceRestService.createPerson( this.enviarPerson)
      .subscribe();
      this.toastrService.success("Ingreso Exitoso, Por favor actualizar la tabla");
    }else{

      this.toastrService.error("Persona no esta registrada");
    }
  }

  deletePerson(){
    this.serviceRestService.deletedPerson(this.busquedaPersona)
    .subscribe(data =>{
      this.toastrService.success("Borrado Exitoso, Por favor actualizar la tabla")   
      this.valorPresente = true;
    });
  
    (this.valorPresente)?this.toastrService.success("persona encontrada en base da Datos"):this.toastrService.error("persona no encontrada");
    this.valorPresente = false;
  }

  Modifier(){
    this.enviarPerson.id= this.idModifier;
    this.serviceRestService.createPerson(this.enviarPerson)
    .subscribe();
    this.toastrService.success("Modificacion Exitoso, Por favor actualizar la tabla");
  }

  verTablaModificar(){
    this.serviceRestService.getPersonById(this.idModifier)
    .subscribe(data => {
      this.personById = data;
      this.hayObjeto = true;
    });

    (this.hayObjeto)? this.mostrarTablaModificar =true:this.toastrService.error("Valor invalido");
    this.hayObjeto = false;
  }  
 
    
}
