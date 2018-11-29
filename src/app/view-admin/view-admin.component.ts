import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router'
import { IdUserService } from "../id-user.service";

@Component({
  selector: 'app-admin-view',
  templateUrl: './view-admin.component.html',
  styleUrls: ['./view-admin.component.css']
})

export class ViewAdminComponent implements OnInit {

  id_lunchroom = this.service.get("id_lunchroom");
  name_lunchroom = this.service.get("name_lunchroom");
  name_current_Shift:String;
  id_current_Shift:number;
  price:number;
  id_user:String;
  line:number;
  flag = false;
  statistics = [];
  token = this.service.get("token");

  interval:any;
//  icons = this.service.icons;

  constructor(private router: Router, private service: IdUserService ) { 
    this.interval = setInterval(data => {
      this.getSiguienteTicket();
      this.getTodosTickets();
    },3000)
  }

  ngOnInit() { 
    if(this.token == undefined || this.token == ""){
      this.router.navigate([""]);
    }else{
      this.getSiguienteTicket();
      this.getEstadisticas();    
    }
  }

  ngOnDestroy(){
    clearInterval(this.interval);
    this.service.set("token", "");
  }

  clickChangeTicket(){
    this.flag = true;
    this.updateTicket("FINISHED");
  }

  clickClose(){
    
  }

  logout(){
    this.service.set("token", ""); 
    this.router.navigate(['login'])
  }

  getSiguienteTicket(){
    axios({
      url: 'http://35.231.46.158/graphql/?',
      method: 'post',
      data: {
        query: `
          query{
            nextTicketToken(id_restaurant:"${this.id_lunchroom}", token:"${this.token}"){
              id
              name
              price
              userid
            }
          }
        `
      }
    }).then(result => {
        this.id_current_Shift = result.data.data.nextTicketToken.id; 
        this.name_current_Shift = result.data.data.nextTicketToken.name; 
        this.price = result.data.data.nextTicketToken.price;
        this.id_user = result.data.data.nextTicketToken.userid;
        if (this.flag == false) {
          this.updateTicket("CALLING");
        }
    }).catch(error => {
        this.id_current_Shift = -1;
    });
  }


  updateTicket(status){ 
    axios({
      url: 'http://35.231.46.158/graphql/?',
      method: 'post',
      data: {
        query: `
          mutation{
            updateTicketToken(id_ticket: "${this.id_current_Shift}", token:"${this.token}" ticket:{
              status: "${status}"
            }){
              lunchroomId
            }
          }
        `
      }
    }).then(result => { 
      if (this.flag == true) {
        this.getSiguienteTicket();
        this.flag = false;
        this.getUserInfo();
      }
    }).catch(error => {
      console.log(error)
    });
  }


  getTodosTickets(){
    axios({
      url: 'http://35.231.46.158/graphql/?',
      method: 'post',
      data: {
        query: `
          query{
            ticketsByRestaurantToken(id_restaurant:"${this.id_lunchroom}", token:"${this.token}"){
              id
            }
          }
        `
      }
    }).then(result => {
        this.line = result.data.data.ticketsByRestaurantToken.length;
    }).catch(error => {
      console.log(error)
    });
  }


  getUserInfo(){
    axios({
      url: 'http://35.231.46.158/graphql/?',
      method: 'post',
      data: {
        query: `
          query{
            userByIdToken(cedula_user:"${this.id_user}", token:"${this.token}"){
              _id
            }
          }
        `
      }
    }).then(result => {
      this.id_user = result.data.data.userByIdToken._id;
      this.actuTicketActivo();
    }).catch(error => {
      console.log(error)
    });
  }


  actuTicketActivo(){
    axios({
      url: 'http://35.231.46.158/graphql/?',
      method: 'post',
      data: {
        query: `
          mutation{
            updateUserToken(id_user:"${this.id_user}", token:"${this.token}", user:{
              active_ticket:" "
            })
          }
        `
      }
    }).then(result => {      
    }).catch(error => {
      console.log(error)
    });
  }


  getEstadisticas(){
    axios({
      url: 'http://35.231.46.158/graphql/?',
      method: 'post',
      data: {
        query: `
          query{
            allStatistics{
              t{
                date
                sold_lunches
                canceled_shifts
                av_time
                av_punctuation
                bonus_sold
                student_sold
                external_sold
              }
            }
          }
        `
      }
    }).then(result => {
      this.statistics = result.data.data.allStatistics.t;
    }).catch(error => {
      console.log(error)
    });
  }

}
