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
      url: 'http://35.196.156.187/graphql/?',
      method: 'post',
      data: {
        query: `
          mutation{
            login(login:{
              name:"${email}"
              password:"${password}"
            })
          }
        `
      }
    }).then(result => {
      if(result.data.data.login == null){
        alert("Usuario o contraseña incorrecta");
      }else if (result.data.data.login == "Usuario no registrado en LDAP pero si en la base de datos"){
        alert("No tienes acceso: LDAP no encontrado");
      }else{ this.service.set("token", result.data.data.login)
        this.verifyLunchroom(email);
      }
    }).catch(error => {
      console.log(error)
    });
  }

  verifyLunchroom(email){
    axios({
      url: 'http://35.196.156.187/graphql/?',
      method: 'post',
      data: {
        query: `
          query{
            userById(cedula_user:"${email}"){
              lunchroom_id
            }
          }
        `
      }
    }).then(result => {
      if(result.data.data.userById.lunchroom_id != this.service.get("id_lunchroom")){        
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
      url: 'http://35.196.156.187/graphql/?',
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
