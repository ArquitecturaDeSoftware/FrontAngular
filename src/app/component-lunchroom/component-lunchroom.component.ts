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
  stars_orange:any;
  stars_black:any;

  constructor(private service: IdUserService) { }

  ngOnInit() {
    this.getRatingRestaurante();  
  }

  ngOnDestroy(){
    this.active = false;
  }

  onClick(){
    this.active = true;
    this.service.set("id_lunchroom", this.id_lunchroom);
    this.getTicketsPorRestaurante();
    if (this.id_lunchroom == this.service.get("lunchroom_user")) {
      this.service.set("price", "0");
    }else if(this.service.get("lunchroom_user") == "none"){
      this.service.set("price", "6500");
    }else{
      this.service.set("price", "4800");
    }
  }

  getTicketsPorRestaurante(){
    axios({
      url: 'http://35.196.156.187/graphql/?',
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

  getRatingRestaurante(){
    axios({
      url: 'http://35.196.156.187/graphql/?',
      method: 'post',
      data: {
        query: `
          query{
            postsByRestaurant(id_restaurant:"${this.id_lunchroom}"){
              score
            }
          }
        `
      }
    }).then(result => { 
        var rating;
        var sum = 0;
        
        if(result.data.data != null){
          rating = result.data.data.postsByRestaurant;
        }else{
          rating = "";
        }
             
        if (rating.length > 0) {
          for (let i = 0; i < rating.length; i++) {
            sum = sum + rating[i].score;
          }
          sum = sum / rating.length;
          this.stars_orange = new Array(Math.round(sum));
          this.stars_black = new Array(5-Math.round(sum));
        } else {
          this.stars_orange = new Array(0);
          this.stars_black = new Array(5);
        }        
    }).catch(error => {
      console.log(error)
    });
  }

}
