import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { IdUserService } from "../id-user.service";
import axios from "axios";


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

  src = this.service.src;

  soup;
  appetizer;
  main_course;
  protein;
  juice;
  dessert;
  salad;

  constructor(private router: Router, private service: IdUserService) { }

  ngOnInit() {
    this.menusByLunchroom()
  }

  clickClose(){
    this.close.emit(null);
  }

  pedirTurno(){   
    this.service.set("name_lunchroom", this.name_lunchroom);
    this.service.set("index", this.index);
    this.service.set("id_lunchroom", this.id_lunchroom);
    this.createTicket()
  }

  verComentarios(){
    this.service.set("id_lunchroom", this.id_lunchroom);
    this.router.navigate(['comments']);
  }

  menusByLunchroom(){
    axios({
      url: 'http://35.229.97.157:5000/graphql/?',
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

  createTicket(){
    axios({
      url: 'http://35.229.97.157:5000/graphql/?',
      method: 'post',
      data: {
        query: `
            mutation{
              createTicket(ticket:{
                lunchroomId: "${this.service.get("id_lunchroom")}"
                userId: ${this.service.get("user_id")}
                price: ${(this.service.get("id_user") > 9999 ? 4800 : 6500)}
              }){
                id
              }
            }
          `
      }
    }).then(result => {
        this.service.set("id_ticket", result.data.data.createTicket.id);
        this.router.navigate(['tickets']);
    }).catch(error => {
      console.log(error)
    });
  }

}
