import { Component, OnInit, OnDestroy} from '@angular/core';
import { Router } from '@angular/router'
import { IdUserService } from "../id-user.service";

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.css']
})

export class HomeViewComponent implements OnInit {

  user_def = Math.ceil(1000 + Math.random() * (9999 - 1000));
  src = this.data.src;

  constructor(private router: Router, private data: IdUserService) { 
    
  }

  ngOnInit() {
  }

  onClick(value){
    this.data.user_id = value; 
    if (value != "") {
      this.router.navigate(['lunchrooms'])
    }
  }

  onClick2(){
    this.data.user_id = this.user_def;
    this.router.navigate(['lunchrooms'])
  }

}
