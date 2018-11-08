import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { IdUserService } from "../id-user.service";
import axios from "axios";
import { and } from '@angular/router/src/utils/collection';

declare var $:any;

@Component({
  selector: 'app-component-lunchroom-modal-ticket',
  templateUrl: './component-lunchroom-modal-ticket.component.html',
  styleUrls: ['./component-lunchroom-modal-ticket.component.css']
})
export class ComponentLunchroomModalTicketComponent implements OnInit {

  
  @Output () close = new EventEmitter(); 
  @Input() id_lunchroom;
  @Input() name_lunchroom: String;
  @Input() code_lunchroom: String;
  @Input() principal_count: number;
  @Input() open_time: String;
  @Input() close_time: String;
  @Input() num_lunches: number;
  @Input() num_ed: number;
  
  view_ticket: boolean;
  name_ticket: String;
  active_ticket: String;

  constructor(private service: IdUserService, private router: Router) {}

  ngOnInit() {
    this.view_ticket = false;
    this.getOldTicket();
    $("#myModalTicket").on('hide.bs.modal', () => {
      this.clickClose();
    }); 
  }

  clickClose(){
    this.close.emit(null);
  }
  
  getOldTicket(){
    if(this.service.get("active_ticket") != null && this.service.get("active_ticket") != ""){
      this.view_ticket = true;
      this.getTicketById(this.service.get("active_ticket"));
    }
  }

  getTicketById(id){
    axios({
      url: 'http://35.229.97.157:5000/graphql/?',
      method: 'post',
      data: {
        query: `
          query{
            ticketByID(id_ticket:"${id}"){
              name
            }
          }
        `
      }
    }).then(result => {
      this.service.set("name_ticket", result.data.data.ticketByID.name);
      this.name_ticket = result.data.data.ticketByID.name
    }).catch(error => {
      console.log(error)
    });
  }

  crearTicket(){
    axios({
      url: 'http://35.229.97.157:5000/graphql/?',
      method: 'post',
      data: {
        query: `
            mutation{
              createTicket(ticket:{
                lunchroomId: "${this.service.get("id_lunchroom")}"
                userId: ${this.service.get("ced_user")}
                price: ${this.service.get("price")}
                name: "${this.code_lunchroom + this.principal_count.toString()}"
              }){
                name
                id
              }
            }
          `
      }
    }).then(result => {
        this.service.set("name_ticket", result.data.data.createTicket.name);
        this.name_ticket = this.service.get("name_ticket");
        this.service.set("id_ticket", result.data.data.createTicket.id);
        this.service.set("active_ticket", result.data.data.createTicket.id);
        this.active_ticket = result.data.data.createTicket.id;
        this.aumentarContadorLunchroom();
    }).catch(error => {
      console.log(error)
    });
  }

  aumentarContadorLunchroom(){
    axios({
      url: 'http://35.229.97.157:5000/graphql/?',
      method: 'post',
      data: {
        query: `
          mutation{
            updateLunchroom(id_lunchroom:"${this.id_lunchroom}", lunchroom:{
              name:"${this.name_lunchroom}"
              numlunch: ${this.num_lunches}
              openTime: "${this.open_time}"
              closeTime: "${this.close_time}"
              building: "${this.num_ed}"
              code: "${this.code_lunchroom}"
              principalCount: ${this.principal_count + 1}
            }){
              principalCount
            }
          }
          `
      }
    }).then(result => {
      this.actuTicketActivo(this.service.get("active_ticket"));
      this.view_ticket = true;
    }).catch(error => {
      console.log(error)
    });
  }

  actuTicketActivo(active_ticket){
    axios({
      url: 'http://35.229.97.157:5000/graphql/?',
      method: 'post',
      data: {
        query: `
          mutation{
            updateUser(id_user:"${this.service.get("id_user")}", user:{
              active_ticket:"${active_ticket}"
            }){
              err
            }
          }
        `
      }
    }).then(result => {
      console.log(active_ticket)
    }).catch(error => {
      console.log(error)
    });
  }

  cancelarTurno(){
    axios({
      url: 'http://35.229.97.157:5000/graphql/?',
      method: 'post',
      data: {
        query: `
          mutation{
            updateTicket(id_ticket: "${this.service.get("id_ticket")}", ticket:{
              status: "CANCELLED"
            }){
              id
            }
          }
        `
      }
    }).then(result => {
      this.actuTicketActivo("");
      this.service.set("name_ticket", "");
      this.name_ticket = this.service.get("name_ticket");
      this.service.set("id_ticket", "");
      this.service.set("active_ticket", "");
      this.active_ticket = this.service.get("active_ticket");
      this.service.set("id_lunchroom_ticket", "");
      this.view_ticket = false;
    }).catch(error => {
      console.log(error)
    });
  }

}
