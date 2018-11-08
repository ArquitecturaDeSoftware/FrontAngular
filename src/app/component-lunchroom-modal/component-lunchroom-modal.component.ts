import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { IdUserService } from "../id-user.service";
import axios from "axios";


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
  @Input () line;

  src = this.service.src;

  soup : String;
  appetizer : String;
  main_course : String;
  protein : String;
  juice : String;
  dessert : String;
  salad : String;

  constructor(private router: Router, 
              private service: IdUserService) {         
  }      

  ngOnInit() {
    this.service.set("line", this.line)
    this.menuPorRestaurante();   
    $("#myModal").on('hide.bs.modal', () => {
      this.clickClose();
    });     
  }

  clickClose(){
    this.close.emit(null);
  }

  menuPorRestaurante(){
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
