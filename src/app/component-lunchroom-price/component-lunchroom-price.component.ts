import { Component, OnInit, Input } from '@angular/core';
import { IdUserService } from "../id-user.service";
import axios from "axios";

@Component({
  selector: 'app-component-lunchroom-price',
  templateUrl: './component-lunchroom-price.component.html',
  styleUrls: ['./component-lunchroom-price.component.css']
})
export class ComponentLunchroomPriceComponent implements OnInit {

  user_id = this.service.user_id;
  id_lunchroom = this.service.id_lunchroom
  line:any;
  time:number;

  constructor(private service: IdUserService) { }

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
