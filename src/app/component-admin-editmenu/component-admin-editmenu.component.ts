import { Component, OnInit, Input } from '@angular/core';
import axios from 'axios'

@Component({
  selector: 'app-component-admin-editmenu',
  templateUrl: './component-admin-editmenu.component.html',
  styleUrls: ['./component-admin-editmenu.component.css']
})
export class ComponentAdminEditmenuComponent implements OnInit {

  @Input () id_lunchroom;
  soup:String;
  appetizer:String;
  main_course:String;
  protein:String;
  juice:String;
  dessert:String;
  salad:String;
 
  constructor() { }

  ngOnInit() {
    this.menusByLunchroom();    
  }

  actualizarMenu(soup, appetizer, main_course, protein, juice, dessert, salad){    
    axios({
      url: 'http://35.229.97.157:5000/graphql/?',
      method: 'post',
      data: {
        query: `
          mutation{
            updateMenu(id_restaurant:"${this.id_lunchroom}", menu:{
              soup: "${soup}"
              appetizer: "${appetizer}"
              main_course: "${main_course}"
              protein: "${protein}"
              juice: "${juice}"
              dessert: "${dessert}"
              salad: "${salad}"
            }){
              msg
            }
          }
        `
      }
    }).then(result => {
      
    }).catch(error => {
      console.log(error)
    });
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
