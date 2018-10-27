import { Component, OnInit } from '@angular/core';
import axios from 'axios'
import { Router } from '@angular/router'
import { IdUserService } from "../id-user.service";

@Component({
  selector: 'app-ticket-view',
  templateUrl: './view-ticket.component.html',
  styleUrls: ['./view-ticket.component.css']
})
export class ViewTicketComponent implements OnInit {

  name_lunchroom = this.service.name_lunchroom;
  id_lunchroom = this.service.id_lunchroom;
  src = this.service.src;
  index = this.service.index;
  id_user = this.service.user_id;
  price_user = (this.id_user > 9999 ? 4800 : 6500);
  id_ticket = 0;

  soup;
  appetizer;
  main_course;
  protein;
  juice;
  dessert;
  salad;

  constructor(private service: IdUserService, private router: Router) {
  }

  ngOnInit() {    
    this.createTicket()
    this.menuByLunchroom()
  }

  onClick(){
    axios({
      url: 'http://35.229.97.157:5000/graphql/?',
      method: 'post',
      data: {
        query: `
          mutation{
            updateTicket(id_ticket: "${this.id_ticket}", ticket:{
              status: "ERROR"
            }){
              id
            }
          }
        `
      }
    }).then(result => {
    }).catch(error => {
      console.log(error)
    });
    this.router.navigate(['lunchrooms'])
  }

  createTicket(){
    axios({
      url: 'http://35.229.97.157:5000/graphql/?',
      method: 'post',
      data: {
        query: `
            mutation{
              createTicket(ticket:{
                lunchroomId: "${this.id_lunchroom}"
                userId: ${(this.id_user)}
                price: ${(this.price_user)}
              }){
                id
              }
            }
          `
      }
    }).then(result => {
        this.id_ticket = result.data.data.createTicket.id;
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
}
