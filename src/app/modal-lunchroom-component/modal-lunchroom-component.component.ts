import { Component, OnInit, Input } from '@angular/core';
import { IdUserService } from "../id-user.service";
import axios from "axios";


@Component({
  selector: 'app-modal-lunchroom-component',
  templateUrl: './modal-lunchroom-component.component.html',
  styleUrls: ['./modal-lunchroom-component.component.css']
})
export class ModalLunchroomComponentComponent implements OnInit {

  @Input () id_lunchroom;
  @Input () name_lunchroom;

  src:String;
  user_id = this.data.user_id;

  soup;
  appetizer;
  main_course;
  protein;
  juice;
  dessert;
  salad;

  constructor(private data: IdUserService) { }

  ngOnInit() {
    console.log(this.name_lunchroom);
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
