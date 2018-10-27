import { Component, OnInit, OnDestroy} from '@angular/core';
import { Router } from '@angular/router'
import { IdUserService } from "../id-user.service";

@Component({
  selector: 'app-home-view',
  templateUrl: './view-home.component.html',
  styleUrls: ['./view-home.component.css']
})

export class ViewHomeComponent implements OnInit {

  user_def = Math.ceil(1000 + Math.random() * (9999 - 1000));
  src = this.service.src;

  constructor(private router: Router, private service: IdUserService) { 
    
  }

  ngOnInit() {
  }

  onClick(value){
    this.service.user_id = value; 
    if (value != "") {
      this.router.navigate(['lunchrooms'])
    }
  }

  onClick2(){
    this.service.user_id = this.user_def;
    this.router.navigate(['lunchrooms'])
  }

}
