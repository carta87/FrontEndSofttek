import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { Person } from '../models/Archivo.models';

@Injectable({
  providedIn: 'root'
})
export class ServiceRestService {

  constructor(
    private http: HttpClient
  ) { }

  getAllPerson (){
    return this.http.get<any>(environment.Url_apiBD+ "todos");
  }

  createPerson(person : Person){
    return this.http.post(environment.Url_apiBD+ "/save", person);
  }

  updatePerson(idPerson: String){
    console.log("este es mi update" + idPerson);
    return this.http.get<Person>(environment.Url_apiBD + "person/"+ idPerson);
  }

  deletedPerson(idPerson: String){
    console.log("ver id a Eliminar desde service");
    console.log(idPerson);
    return this.http.delete<boolean>(environment.Url_apiBD+ "Person/delete/" + idPerson);
  }
}
