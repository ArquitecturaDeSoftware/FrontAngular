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

  name_lunchroom = this.service.get("name_lunchroom");
  id_lunchroom = this.service.get("id_lunchroom");
  src = this.service.src;
  index = this.service.get("index");
  id_user = this.service.get("user_id");
  price_user = (this.id_user > 9999 ? 4800 : 6500);
  name_ticket = this.service.get("name_ticket")

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
    this.menuByLunchroom()
  }

  onClick(){
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
      this.router.navigate(['lunchrooms'])
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
