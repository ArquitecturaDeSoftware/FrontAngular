import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class IdUserService {

// name_lunchroom   usado para renderizar los componentes
// index  usado     para renderizar las imagenes
// id_lunchroom     usado para seleccionar el restaurante
// name_ticket      usado para mostrar el ticket en pantalla
// id_ticket        corresponde al id de ticket pedido
// ced_user         primer numero ingresado por el usuario
// active_ticket    saber si tiene un turno activo o no
// user_lunchroom   ver el restaurante al cual esta afiliado el usuario
// price            precio del almuerzo
// line             tamaño de la fila

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

  set(variable:string, value){
    sessionStorage.setItem(variable, `${value}`)
  }

  get(variable){
    return sessionStorage.getItem(variable) as any;
  }
  
}
