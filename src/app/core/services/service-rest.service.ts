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

  getPersonById (idPerson : number){
    return this.http.get<any>(environment.Url_apiBD+ "" + idPerson);
  }

  createPerson(person : Person){
    console.log("Este es personaaa para enviar");
    console.log(person);
    return this.http.post(environment.Url_apiBD+ "save", person);
  }

  deletedPerson(idPerson: number){
    console.log("ver id a Eliminar desde service");
    console.log(idPerson);
    return this.http.delete<boolean>(environment.Url_apiBD+ "delete/" + idPerson);
  }
}
