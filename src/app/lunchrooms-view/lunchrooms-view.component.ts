import { Component, OnInit, OnDestroy } from '@angular/core';
import { IdUserService } from "../id-user.service";
import axios from "axios";

@Component({
  selector: 'app-lunchrooms-view',
  templateUrl: './lunchrooms-view.component.html',
  styleUrls: ['./lunchrooms-view.component.css']
})
export class LunchroomsViewComponent implements OnInit {

  user_ced:any;
  user_def:any;
  all_lunchrooms = []

  constructor(private data: IdUserService) { }

  ngOnInit() {
    this.user_ced = this.data.user_ced;
    this.user_def = this.data.user_def;
    console.log("Exito");
    
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
        console.log(this.data.all_lunchrooms);
        
    }).catch(error => {
      console.log(error)
    });
  }
}
