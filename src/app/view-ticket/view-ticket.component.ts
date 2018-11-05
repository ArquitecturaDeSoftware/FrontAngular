import { Component, OnInit, OnDestroy } from '@angular/core';
import axios from 'axios'
import { Router } from '@angular/router'
import { IdUserService } from "../id-user.service";
import {Location} from "@angular/common";


@Component({
  selector: 'app-ticket-view',
  templateUrl: './view-ticket.component.html',
  styleUrls: ['./view-ticket.component.css']
})
export class ViewTicketComponent implements OnInit {

  name_lunchroom = this.service.get("name_lunchroom");
  id_lunchroom = this.service.get("id_lunchroom");
  src = this.service.src;
  index = this.service.get("index");
  id_user = this.service.get("ced_user");
  price_user = this.service.get("price");
  name_ticket = this.service.get("name_ticket")

  soup;
  appetizer;
  main_course;
  protein;
  juice;
  dessert;
  salad;

  falg = true;

  constructor(private service: IdUserService, private router: Router) {
      //evitar que la pagina retroceda
      history.pushState(null, null, null);
      window.onpopstate = function () {        
        history.go(1);
      };
  }

  ngOnInit() {  
    this.getTurnosAnteriores();  
    this.menuByLunchroom();
  }

  ngOnDestroy() {
    window.onpopstate = null;
  }

  cancelarTurno(){
    axios({
      url: 'http://35.229.97.157:5000/graphql/?',
      method: 'post',
      data: {
        query: `
          mutation{
            updateTicket(id_ticket: "${this.service.get("id_ticket")}", ticket:{
              status: "ERROR"
            }){
              id
            }
          }
        `
      }
    }).then(result => {
      this.actuTicketActivo();
    }).catch(error => {
      console.log(error)
    });
  }

  menuByLunchroom(){
    axios({
      url: 'http://35.229.97.157:5000/graphql/?',
      method: 'post',
      data: {
        query: `
          query{
            menusByRestaurant(id_restaurant:"${this.id_lunchroom}"){
              soup
              appetizer
              main_course
              protein
              juice
              dessert
              salad
            }
          }
        `
      }
    }).then(result => {
        this.soup = result.data.data.menusByRestaurant[0].soup;
        this.appetizer = result.data.data.menusByRestaurant[0].appetizer
        this.main_course = result.data.data.menusByRestaurant[0].main_course
        this.protein = result.data.data.menusByRestaurant[0].protein
        this.juice = result.data.data.menusByRestaurant[0].juice
        this.dessert = result.data.data.menusByRestaurant[0].dessert
        this.salad = result.data.data.menusByRestaurant[0].salad        
    }).catch(error => {
      console.log(error)
    });
  }

  getTurnosAnteriores(){
    axios({
      url: 'http://35.229.97.157:5000/graphql/?',
      method: 'post',
      data: {
        query: `
          query{
            ticketsBefore(id_ticket:"${this.service.get("id_ticket")}"){
              id
            }
          }
        `
      }
    }).then(result => {
      this.service.set("line", result.data.data.ticketsBefore.length)
    }).catch(error => {
      console.log(error)
    });
  }

  actuTicketActivo(){
    axios({
      url: 'http://35.229.97.157:5000/graphql/?',
      method: 'post',
      data: {
        query: `
          mutation{
            updateUser(id_user:"${this.service.get("id_user")}", user:{
              cedula:"${this.service.get("ced_user")}"
              name:"${this.service.get("name_user")}"
              lunchroom_id:"${this.service.get("lunchroom_user")}"
              active_ticket:""
            }){
              err
            }
          }
        `
      }
    }).then(result => {
      this.router.navigate(['lunchrooms']);
    }).catch(error => {
      console.log(error)
    });
  }
  
}
