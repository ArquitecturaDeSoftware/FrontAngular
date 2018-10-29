import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class IdUserService {

// name_lunchroom
// index
// id_lunchroom
// name_ticket
// id_ticket
// user_id

  all_lunchrooms = [];
  src = ["../assets/lunchrooms/geologia.png",
  "../assets/lunchrooms/comedor-central.png",
  "../assets/lunchrooms/biologia.png",
  "../assets/lunchrooms/cafe-campus.png",
  "../assets/lunchrooms/ciencias-agrarias.png", 
  "../assets/lunchrooms/ciencias-economicas.png",
  "../assets/lunchrooms/ciencias-humanas.png",
  "../assets/lunchrooms/hemeroteca.png",
  "../assets/lunchrooms/matematicas.png",
  "../assets/lunchrooms/odontologia.png"];
 
  constructor() { }

  set(variable, value){
    sessionStorage.setItem(variable, `${value}`)
  }

  get(variable){
    return sessionStorage.getItem(variable) as any;
  }
  
}
