import { Component, OnInit, Input } from '@angular/core';
import { IdUserService } from "../id-user.service";
import axios from "axios";

@Component({
  selector: 'app-price-time-ticket-info-component',
  templateUrl: './price-time-ticket-info-component.component.html',
  styleUrls: ['./price-time-ticket-info-component.component.css']
})
export class PriceTimeTicketInfoComponentComponent implements OnInit {

  user_id = this.data.user_id;
  id_lunchroom = this.data.id_lunchroom
  line:any;
  time:number;

  constructor(private data: IdUserService) { }

  ngOnInit() {
    this.getTicketsByLunchroom()    
  }

  getTicketsByLunchroom(){
    axios({
      url: 'http://35.229.97.157:5000/graphql/?',
      method: 'post',
      data: {
        query: `
          query{
            ticketsByRestaurant(id_restaurant:"${this.id_lunchroom}"){
              id
              lunchroomId
              userid
              status
              price
              date
            }
          }
          `
      }
    }).then(result => {
        this.line = result.data.data.ticketsByRestaurant.length;
        this.time = this.line*3;
    }).catch(error => {
      console.log(error)
    });
  }

}
