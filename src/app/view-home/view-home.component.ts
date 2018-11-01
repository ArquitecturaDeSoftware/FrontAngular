import { Component, OnInit, OnDestroy} from '@angular/core';
import { Router } from '@angular/router'
import { IdUserService } from "../id-user.service";
import axios from 'axios'
import { log } from 'util';
declare var $:any;

@Component({
  selector: 'app-home-view',
  templateUrl: './view-home.component.html',
  styleUrls: ['./view-home.component.css']
})

export class ViewHomeComponent implements OnInit {

  user_def = Math.ceil(1000 + Math.random() * (9999 - 1000));
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
      this.getUser()
    }
    else{
      console.log(this.id);
      
      this.id = true;
      console.log(this.id);
    }
  }

  onClick2(){
    this.service.set("ced_user", this.user_def);
    this.router.navigate(['lunchrooms']);
    this.service.set("user_lunchroom", "none");
  }

  getUser(){
    axios({
      url: 'http://35.229.97.157:5000/graphql/?',
      method: 'post',
      data: {
        query: `
          query{
            userById(id_user:"${this.service.get("ced_user")}"){
              t{
                active_ticket
                lunchroom_id
              }
            }
          }
        `
      }
    }).then(result => {
      if (result.data.data.userById.t == null) {
        alert("Ingresa un usuario valido")
      }else{
        this.service.set("user_lunchroom", result.data.data.userById.t[0].lunchroom_id);
        this.service.set("active_ticket", result.data.data.userById.t[0].active_ticket);
        this.router.navigate(['lunchrooms']);
      }
    }).catch(error => {
      console.log(error)
    });
  }

}
