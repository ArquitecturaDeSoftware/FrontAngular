import { Component, OnInit } from '@angular/core';
import axios from 'axios'
import { IdUserService } from "../id-user.service";

@Component({
  selector: 'app-ticket-view',
  templateUrl: './ticket-view.component.html',
  styleUrls: ['./ticket-view.component.css']
})
export class TicketViewComponent implements OnInit {

  name_lunchroom = this.data.name_lunchroom;
  id_lunchroom = this.data.id_lunchroom;
  src = this.data.src;
  index = this.data.index;
  id_user = this.data.user_id;
  price_user = (this.id_user > 9999 ? 4800 : 6500);
  id_ticket = 0;

  soup;
  appetizer;
  main_course;
  protein;
  juice;
  dessert;
  salad;

  constructor(private data: IdUserService) {
  }

  ngOnInit() {    
    this.createTicket()
    this.menuByLunchroom()
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

