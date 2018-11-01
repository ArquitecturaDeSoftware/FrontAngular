import { Component, OnInit, OnDestroy} from '@angular/core';
import { Router } from '@angular/router'
import { IdUserService } from "../id-user.service";
import { log } from 'util';
declare var $:any;
@Component({
  selector: 'app-home-view',
  templateUrl: './view-home.component.html',
  styleUrls: ['./view-home.component.css']
})

export class ViewHomeComponent implements OnInit {

  user_def = Math.ceil(1000 + Math.random() * (9999 - 1000));
  src = this.service.src;
  id = false;

  constructor(private router: Router, private service: IdUserService) { }

  ngOnInit() {
    $(document).ready( () => {
      $('[data-toggle="tooltip"]').tooltip();   
  });
  }

  onClick(value){
    this.service.set("user_id", value); 
    if (value != "") {
      this.router.navigate(['lunchrooms'])
    }
    else{
      console.log(this.id);
      
      this.id = true;
      console.log(this.id);
    }
  }

  onClick2(){
    this.service.set("user_id", this.user_def);
    this.router.navigate(['lunchrooms'])
  }

}
