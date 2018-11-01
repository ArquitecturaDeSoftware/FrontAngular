import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-admin-view',
  templateUrl: './view-admin.component.html',
  styleUrls: ['./view-admin.component.css']
})

export class ViewAdminComponent implements OnInit {

  id_lunchroom = "5bd668a7160100435c3ba483";
  name_current_Shift:String;
  id_current_Shift:number;
  price:number;
  line:number;
  flag = false;

  constructor() { 
    setInterval(data => {
      this.getSiguienteTicket();
      this.getTodosTickets();
    },3000)
  }

  ngOnInit() { 
    this.getSiguienteTicket()    
  }

  clickChangeTicket(){
    this.flag = true;
    this.updateTicket("FINISHED");
  }

  clickStats(){

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
            }
          }
        `
      }
    }).then(result => {
        this.id_current_Shift = result.data.data.nextTicket.id; 
        this.name_current_Shift = result.data.data.nextTicket.name; 
        this.price = result.data.data.nextTicket.price;
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
}
