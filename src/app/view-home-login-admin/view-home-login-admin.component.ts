import { Component, OnInit } from '@angular/core';
import axios from 'axios'
import { Router } from '@angular/router'
import { IdUserService } from "../id-user.service";


@Component({
  selector: 'app-view-home-login-admin',
  templateUrl: './view-home-login-admin.component.html',
  styleUrls: ['./view-home-login-admin.component.css']
})
export class ViewHomeLoginAdminComponent implements OnInit {

  name_lunchroom = "Seleccione un comedor";
  all_lunchrooms = [];

  constructor(private router: Router, private service: IdUserService) {
    history.pushState(null, null, null);
      window.onpopstate = function () {        
        history.go(1);
      };
   }

  ngOnInit() {
    this.getTodosRestaurantes();
  }

  onClick(name, id){
    this.name_lunchroom = name;
    this.service.set("id_lunchroom", id); 
    this.service.set("name_lunchroom", name);   
  }

  clickLogin(email, password){
    axios({
      url: 'http://35.231.46.158/graphql/?',
      method: 'post',
      data: {
        query: `
          query{
            userById(cedula_user:"${email}"){
              t{
                password
                lunchroom_id
              }
            }
          }
        `
      }
    }).then(result => {
      if (result.data.data.userById == null || result.data.data.userById.t == null) {
        alert("Ingresa un usuario válido");
      } else if(password == ""){
        alert("Ingresa una contraseña");
      } else if(result.data.data.userById.t[0].password != password){
        alert("Contraseña incorrecta");
      }else if(result.data.data.userById.t[0].lunchroom_id != this.service.get("id_lunchroom")){
        console.log(result.data.data.userById.t[0].lunchroom_id, this.service.get("id_lunchroom"));
        
        alert("No puedes acceder a este restaurante");
      }else{
        this.router.navigate(["admin"]);
      }
    }).catch(error => {
      console.log(error)
    });
  }

  getTodosRestaurantes(){
    axios({
      url: 'http://35.231.46.158/graphql/?',
      method: 'post',
      data: {
        query: `
          query{
            allLunchrooms{
              _id
              name
            }
          }
        `
      }
    }).then(result => {
      this.all_lunchrooms = result.data.data.allLunchrooms;
    }).catch(error => {
      console.log(error)
    });
  }

}
