import { Component, OnInit, Input } from '@angular/core';
import { IdUserService } from "../id-user.service";
import axios from "axios";
import { Router } from '@angular/router';



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
  
  line : number;
  active_menu : boolean;
  active_ticket : boolean;
  id_lunchroom_ticket: String;
  src = this.service.src;
  stars_orange:any;
  stars_black:any;

  constructor(private service: IdUserService, private router: Router) {}


  ngOnInit() {  
    this.active_menu = false;
    this.active_ticket = false;
    this.getTicketActive(this.service.get("active_ticket"));
    setInterval(() => {
      if(this.service.get("active_ticket") != null && this.service.get("active_ticket") != ""  && this.id_lunchroom == this.service.get("id_lunchroom_ticket")){
        this.getTurnosAnteriores();
      }else{
        this.getTicketsAdelantePorRestaurante();
      }
      
    },1000);  
  }

  getTicketActive(id){
    axios({
      url: 'http://35.229.97.157:5000/graphql/?',
      method: 'post',
      data: {
        query: `
          query{
            ticketByID(id_ticket:"${id}"){
              lunchroomId
            }
          }
        `
      }
    }).then(result => {
      this.service.set("id_lunchroom_ticket", result.data.data.ticketByID.lunchroomId);
      
    }).catch(error => {
      console.log(error)
    });
  }

  clickMenu(){
    this.active_menu = true;
    this.service.set("id_lunchroom", this.id_lunchroom);
    if (this.id_lunchroom == this.service.get("lunchroom_user")) {
      this.service.set("price", "0");
    }else if(this.service.get("lunchroom_user") == "none"){
      this.service.set("price", "6500");
    }else{
      this.service.set("price", "4800");
    }
  }

  getTicketsAdelantePorRestaurante(){
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
          this.line = result.data.data.ticketsByRestaurant.length;
    }).catch(error => {
      console.log(error)
    });
  }

  ngOnDestroy(){
    this.active_menu = false;
    this.active_ticket = false;
  }
  
  clickVerComentarios(){
    this.service.set("id_lunchroom", this.id_lunchroom);
    this.router.navigate(['comments']);
  }

  clickPedirTurno(){  
    this.active_ticket = true;
    this.service.set("name_lunchroom", this.name_lunchroom);
    this.service.set("index", this.index);
    this.service.set("id_lunchroom", this.id_lunchroom);
  }

  getTurnosAnteriores(){
    axios({
      url: 'http://35.229.97.157:5000/graphql/?',
      method: 'post',
      data: {
        query: `
          query{
            ticketsBefore(id_ticket:"${this.service.get("active_ticket")}"){
              id
            }
          }
        `
      }
    }).then(result => {
      this.line = result.data.data.ticketsBefore.length;
    }).catch(error => {
      console.log(error)
    });
  }
}
