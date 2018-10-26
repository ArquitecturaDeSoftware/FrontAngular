import { Component, OnInit, OnDestroy } from '@angular/core';
import { IdUserService } from "../id-user.service";
import axios from "axios";

@Component({
  selector: 'app-lunchrooms-view',
  templateUrl: './lunchrooms-view.component.html',
  styleUrls: ['./lunchrooms-view.component.css']
})
export class LunchroomsViewComponent implements OnInit {

  user_id:any;
  name_lunchroom:String;

  constructor(private data: IdUserService) {
    
   }

  ngOnInit() {
    this.user_id = this.data.user_id;
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
        this.data.all_lunchrooms = result.data.data.allLunchrooms;           
    }).catch(error => {
      console.log(error)
    });
  }
}
