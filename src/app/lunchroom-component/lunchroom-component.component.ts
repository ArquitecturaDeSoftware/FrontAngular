import { Component, OnInit, Input } from '@angular/core';
import { IdUserService } from "../id-user.service";

@Component({
  selector: 'app-lunchroom-component',
  templateUrl: './lunchroom-component.component.html',
  styleUrls: ['./lunchroom-component.component.css']
})
export class LunchroomComponentComponent implements OnInit {

  @Input () id_lunchroom;
  @Input () name_lunchroom;

  constructor(private data: IdUserService) { }

  ngOnInit() {    
  }

  onClick(){
    
  }

}
