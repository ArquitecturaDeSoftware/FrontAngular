import { Component, OnInit } from '@angular/core';
import axios from 'axios';
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
//  icons = this.service.icons;

  constructor( private service: IdUserService ) { 
    setInterval(data => {
      this.getSiguienteTicket();
      this.getTodosTickets();
    },3000)
  }

  ngOnInit() { 
    this.getSiguienteTicket();
    this.getEstadisticas();
  }

  clickChangeTicket(){
    this.flag = true;
    this.updateTicket("FINISHED");
  }


  getSiguienteTicket(){
    axios({
      url: 'http://35.229.97.157:5000/graphql/?',
      method: 'post',
      data: {
        query: `
          query{
            nextTicket(id_restaurant:"${this.id_lunchroom}"){
              id
              name
              price
              userid
            }
          }
        `
      }
    }).then(result => {
        this.id_current_Shift = result.data.data.nextTicket.id; 
        this.name_current_Shift = result.data.data.nextTicket.name; 
        this.price = result.data.data.nextTicket.price;
        this.id_user = result.data.data.nextTicket.userid;
        if (this.flag == false) {
          this.updateTicket("CALLING");
        }
    }).catch(error => {
        this.id_current_Shift = -1;
    });
  }


  updateTicket(status){ 
    axios({
      url: 'http://35.229.97.157:5000/graphql/?',
      method: 'post',
      data: {
        query: `
          mutation{
            updateTicket(id_ticket: "${this.id_current_Shift}", ticket:{
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


  getUserInfo(){
    axios({
      url: 'http://35.229.97.157:5000/graphql/?',
      method: 'post',
      data: {
        query: `
          query{
            userById(cedula_user:"${this.id_user}"){
              t{
                id
              }
            }
          }
        `
      }
    }).then(result => {
      this.id_user = result.data.data.userById.t[0].id;
      this.actuTicketActivo();
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
            updateUser(id_user:"${this.id_user}", user:{
              active_ticket:""
            }){
              err
            }
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
      url: 'http://35.229.97.157:5000/graphql/?',
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
      console.log(this.statistics);
    }).catch(error => {
      console.log(error)
    });
  }

}
