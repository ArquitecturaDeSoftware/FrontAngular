import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdUserService {

  constructor() { }
  
  user_id:any;
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
  name_lunchroom:any;
  id_lunchroom:any;
  index:any;

}
