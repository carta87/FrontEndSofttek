import { Component, OnInit } from '@angular/core';
import { Person } from '../../../core/models/Archivo.models';
import { ServiceRestService } from '../../../core/services/service-rest.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent implements OnInit {

  habilitarCreate : boolean = false;
  habilitarUpdate : boolean = false;
  habilitarUpdate2 : boolean = false;
  habilitarDelete : boolean = false;
  confirmacioDelete : boolean = false;
  id : String = "";
  enviarPerson : Person = {
    id:null,
    name : null,
    lastName : null,
    dni : null,
    employee : null,
  }
  constructor(
    private serviceRestService: ServiceRestService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
  }

  create(){
    this.habilitarCreate=true;
    this.habilitarUpdate = false;
    this.habilitarUpdate2 = false;
    this.habilitarDelete = false;
  }

  update(){
    this.habilitarCreate=false;
    this.habilitarDelete = false;
    this.habilitarUpdate = true;
  }

  Eliminar(){
    this.habilitarDelete = true;
    this.habilitarCreate=false;
    this.habilitarUpdate = false;
    this.habilitarUpdate2 = false;
  }

  Enviar(){
    this.habilitarCreate=false;
    console.log("esto es el objeto que envio");
    console.log(this.enviarPerson);
    this.serviceRestService.createPerson(this.enviarPerson).subscribe();
    this.toastrService.success("Registro Guardado con exito");
    this.toastrService.success("Por favor actualizar la tabla");
  }


  buscar(){
    this.serviceRestService.updatePerson(this.id).subscribe(data =>{
      this.enviarPerson = data
      if (data == null){
        this.habilitarUpdate2 = false;
        this.toastrService.error("El numero ingresado no pertenece a la tabla");
      } else {
        console.log(this.enviarPerson);
        this.habilitarUpdate2 = true;
      }
    });
  }

  EliminarArchive(){
    this.serviceRestService.deletedPerson(this.id).subscribe(data => {
      this.confirmacioDelete = data;
      if(this.confirmacioDelete){
        this.toastrService.success("Borrado Exitoso");
        this.toastrService.success("Por favor actualizar la tabla");
      }else {
        this.toastrService.error("El numero ingresado no pertenece a la tabla");
      }
    })
  }


}
