import { Component, OnInit, OnDestroy} from '@angular/core';
import { Router } from '@angular/router'
import { IdUserService } from "../id-user.service";
import axios from 'axios'
declare var $:any;

@Component({
  selector: 'app-home-view',
  templateUrl: './view-home.component.html',
  styleUrls: ['./view-home.component.css']
})

export class ViewHomeComponent implements OnInit {

  src = this.service.src;
  id = false;

  constructor(private router: Router, private service: IdUserService) { }

  ngOnInit() {
    $(document).ready( () => {
      $('[data-toggle="tooltip"]').tooltip();   
  });
  }

  onClick(value){
    this.service.set("ced_user", value); 
    if (value != "") {
      this.getUsuario(value)
    }
    else{
      console.log(this.id);
      this.id = true;
      console.log(this.id);
    }
  }

  getUsuario(value){
    axios({
      url: 'http://35.229.97.157:5000/graphql/?',
      method: 'post',
      data: {
        query: `
          query{
            userById(cedula_user:"${this.service.get("ced_user")}"){
              t{
                id
                name
                active_ticket
                lunchroom_id
              }
            }
          }
        `
      }
    }).then(result => {
      if (result.data.data.userById.t == null) {
        this.crearUsuario(value);
      }else{
        this.service.set("id_user", result.data.data.userById.t[0].id);
        this.service.set("name_user", result.data.data.userById.t[0].name);        
        this.service.set("lunchroom_user", result.data.data.userById.t[0].lunchroom_id);
        this.service.set("active_ticket", result.data.data.userById.t[0].active_ticket);
        this.router.navigate(['lunchrooms']);
      }
    }).catch(error => {
      console.log(error)
    });
  }

  crearUsuario(value){
    axios({
      url: 'http://35.229.97.157:5000/graphql/?',
      method: 'post',
      data: {
        query: `
          mutation{
            createUser(user:{
              cedula:"${value}"
              name:""
              lunchroom_id:"none"
              active_ticket:""
            }){
              t{
                active_ticket
                lunchroom_id
              }
            }
          }
        `
      }
    }).then(result => {
      this.service.set("lunchroom_user", "none");      
      this.service.set("active_ticket", "");
      this.router.navigate(['lunchrooms']);
    }).catch(error => {
      console.log(error)
    });
  }

}
