import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { IdUserService } from "../id-user.service";
import axios from "axios";


@Component({
  selector: 'app-modal-lunchroom-component',
  templateUrl: './modal-lunchroom-component.component.html',
  styleUrls: ['./modal-lunchroom-component.component.css']
})
export class ModalLunchroomComponentComponent implements OnInit {

  @Output () close = new EventEmitter(); 
  @Input () index;
  @Input () id_lunchroom;
  @Input () name_lunchroom;

  src = this.data.src;

  soup;
  appetizer;
  main_course;
  protein;
  juice;
  dessert;
  salad;

  constructor(private router: Router, private data: IdUserService) { }

  ngOnInit() {
    this.menusByLunchroom()
  }

  onClick(){
    this.close.emit(null);
  }

  routeTickets(){
    this.onClick();   
    this.data.name_lunchroom = this.name_lunchroom;
    this.data.index = this.index;
    this.data.id_lunchroom = this.id_lunchroom;
    this.router.navigate(['tickets']);
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

}
