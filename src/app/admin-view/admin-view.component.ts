import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { async } from 'rxjs/internal/scheduler/async';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit {

  name_lunchroom;
  id_lunchroom = "5bce0d459804009c34a97474";
  current_Shift:String;

  constructor() { }

  ngOnInit() { 
    this.getNextTicket()
  }

  getNextTicket(){
    console.log("next");
    axios({
      url: 'http://35.229.97.157:5000/graphql/?',
      method: 'post',
      data: {
        query: `
          query{
            nextTicket(id_restaurant:"${this.id_lunchroom}"){
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
        this.current_Shift = result.data.data.nextTicket.id; 
        this.updateTicket("CALLING")  
    }).catch(error => {
      console.log(error)
    });
  }

  updateTicket(status){ 
    console.log("update");   
    axios({
      url: 'http://35.229.97.157:5000/graphql/?',
      method: 'post',
      data: {
        query: `
          mutation{
            updateTicket(id_ticket: "${this.current_Shift}", ticket:{
              status: "${status}"
            }){
              lunchroomId
            }
          }
        `
      }
    }).then(result => { 
    }).catch(error => {
      console.log(error)
    });
  }

  updateTicket2(status){ 
    console.log("update");   
    axios({
      url: 'http://35.229.97.157:5000/graphql/?',
      method: 'post',
      data: {
        query: `
          mutation{
            updateTicket(id_ticket: "${this.current_Shift}", ticket:{
              status: "${status}"
            }){
              lunchroomId
            }
          }
        `
      }
    }).then(result => { 
      this.getNextTicket2();
    }).catch(error => {
      console.log(error)
    });
  }

  getNextTicket2(){
    console.log("next");
    axios({
      url: 'http://35.229.97.157:5000/graphql/?',
      method: 'post',
      data: {
        query: `
          query{
            nextTicket(id_restaurant:"${this.id_lunchroom}"){
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
        this.current_Shift = result.data.data.nextTicket.id; 
    }).catch(error => {
      console.log(error)
    });
  }

  changeTicket(){
    this.updateTicket2("FINISHED");
  }

  clickStats(){
    
  }

}
