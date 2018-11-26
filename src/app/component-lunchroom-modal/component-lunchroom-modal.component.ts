import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { IdUserService } from "../id-user.service";
import axios from "axios";
import { log } from 'util';

declare var $:any;

@Component({
  selector: 'app-component-lunchroom-modal',
  templateUrl: './component-lunchroom-modal.component.html',
  styleUrls: ['./component-lunchroom-modal.component.css']
})
export class ComponentLunchroomModalComponent implements OnInit {

  @Output () close = new EventEmitter(); 
  @Input () index;
  @Input () id_lunchroom;
  @Input () name_lunchroom;
  @Input () code_lunchroom;
  @Input () principal_count;
  @Input () open_time;
  @Input () close_time;
  @Input () num_lunches;
  @Input () num_ed;


  src = this.service.src;

  soup:String;
  appetizer:String;
  main_course:String;
  protein:String;
  juice:String;
  dessert:String;
  salad:String;

  constructor(private router: Router, 
              private service: IdUserService) {         
  }      

  ngOnInit() {
    this.menuPorRestaurante();   
    $("#myModal").on('hide.bs.modal', () => {
      this.clickClose();
    });     
  }

  clickClose(){
    this.close.emit(null);
  }

  clickPedirTurno(){  
    this.service.set("name_lunchroom", this.name_lunchroom);
    this.service.set("index", this.index);
    this.service.set("id_lunchroom", this.id_lunchroom);
    this.crearTicket()
  }

  clickVerComentarios(){
    this.service.set("id_lunchroom", this.id_lunchroom);
    this.router.navigate(['comments']);
  }

  menuPorRestaurante(){
    axios({
      url: 'http://35.231.46.158/graphql/?',
      method: 'post',
      data: {
        query: `
          query{
            menusByRestaurant(id_restaurant:"${this.id_lunchroom}"){
              soup
              appetizer
              main_course
              protein
              juice
              dessert
              salad
            }
          }
          `
      }
    }).then(result => {
        this.soup = result.data.data.menusByRestaurant[0].soup;
        this.appetizer = result.data.data.menusByRestaurant[0].appetizer
        this.main_course = result.data.data.menusByRestaurant[0].main_course
        this.protein = result.data.data.menusByRestaurant[0].protein
        this.juice = result.data.data.menusByRestaurant[0].juice
        this.dessert = result.data.data.menusByRestaurant[0].dessert
        this.salad = result.data.data.menusByRestaurant[0].salad        
    }).catch(error => {
      console.log(error)
    });
  }

  crearTicket(){
    axios({
      url: 'http://35.231.46.158/graphql/?',
      method: 'post',
      data: {
        query: `
            mutation{
              createTicket(ticket:{
                lunchroomId: "${this.service.get("id_lunchroom")}"
                userId: ${this.service.get("ced_user")}
                price: ${this.service.get("price")}
                name: "${this.code_lunchroom + this.principal_count}"
              }){
                name
                id
              }
            }
          `
      }
    }).then(result => {
        this.service.set("name_ticket", result.data.data.createTicket.name);
        this.service.set("id_ticket", result.data.data.createTicket.id);
        this.aumentarContadorLunchroom();
    }).catch(error => {
      console.log(error)
    });
  }

  aumentarContadorLunchroom(){
    axios({
      url: 'http://35.231.46.158/graphql/?',
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
            updateUser(id_user:"${this.service.get("id_user")}", user:{
              active_ticket:"${this.service.get("name_ticket")}"
            }){
              err
            }
          }
        `
      }
    }).then(result => {
        this.router.navigate(['tickets']);
    }).catch(error => {
      console.log(error)
    });
  }

}
