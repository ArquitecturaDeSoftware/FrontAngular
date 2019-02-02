import { Component, OnInit, OnDestroy } from '@angular/core';
import { IdUserService } from "../id-user.service";
import axios from "axios";

@Component({
  selector: 'app-lunchrooms-view',
  templateUrl: './view-lunchrooms.component.html',
  styleUrls: ['./view-lunchrooms.component.css']
})
export class ViewLunchroomsComponent implements OnInit {

  constructor( ) {  
  }

  all_lunchrooms = [];

  ngOnInit() {   
    this.getLunchrooms();    
  }

  getLunchrooms(){
    axios({
      url: 'http://34.73.155.196/graphql/?',
      method: 'post',
      data: {
        query: `
          query{
            allLunchrooms{
              _id
              name
              numlunch
              openTime
              closeTime
              building
              code
              principalCount
            }
          }
        `
      }
    }).then(result => {
        this.all_lunchrooms = result.data.data.allLunchrooms;                      
    }).catch(error => {
      console.log(error)
    });
  }

}
