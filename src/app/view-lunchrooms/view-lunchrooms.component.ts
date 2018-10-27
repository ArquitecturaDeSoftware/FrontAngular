import { Component, OnInit, OnDestroy } from '@angular/core';
import { IdUserService } from "../id-user.service";
import axios from "axios";

@Component({
  selector: 'app-lunchrooms-view',
  templateUrl: './view-lunchrooms.component.html',
  styleUrls: ['./view-lunchrooms.component.css']
})
export class ViewLunchroomsComponent implements OnInit {

  constructor(private service: IdUserService) {  
  }

  ngOnInit() {    
    this.getLunchrooms();
  }

  getLunchrooms(){
    axios({
      url: 'http://35.229.97.157:5000/graphql/?',
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
            }
          }
          `
      }
    }).then(result => {
        this.service.all_lunchrooms = result.data.data.allLunchrooms;                   
    }).catch(error => {
      console.log(error)
    });
  }

}
