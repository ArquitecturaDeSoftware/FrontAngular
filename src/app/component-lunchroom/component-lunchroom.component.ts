import { Component, OnInit, Input } from '@angular/core';
import { IdUserService } from "../id-user.service";
import axios from "axios";


@Component({
  selector: 'app-component-lunchroom',
  templateUrl: './component-lunchroom.component.html',
  styleUrls: ['./component-lunchroom.component.css']
})
export class ComponentLunchroomComponent implements OnInit {

  @Input () id_lunchroom;
  @Input () name_lunchroom;
  @Input () num_ed;
  @Input () index;
  @Input () code_lunchroom;
  @Input () principal_count;
  @Input () open_time;
  @Input () close_time;
  @Input () num_lunches;
  

  active = false;
  src = this.service.src;

  constructor(private service: IdUserService) { }

  ngOnInit() {    
  }

  onClick(){
    this.active = true;
    this.service.set("id_lunchroom", this.id_lunchroom);
    this.getTicketsPorRestaurante();
    if (this.id_lunchroom == this.service.get("user_lunchroom")) {
      this.service.set("price", "0");
    }else if(this.service.get("user_lunchroom") == "none"){
      this.service.set("price", "6500");
    }else{
      this.service.set("price", "4800");
    }
  }

  getTicketsPorRestaurante(){
    axios({
      url: 'http://35.229.97.157:5000/graphql/?',
      method: 'post',
      data: {
        query: `
          query{
            ticketsByRestaurant(id_restaurant:"${this.id_lunchroom}"){
              id
            }
          }
        `
      }
    }).then(result => {
        this.service.set("line", result.data.data.ticketsByRestaurant.length);
    }).catch(error => {
      console.log(error)
    });
  }

}
