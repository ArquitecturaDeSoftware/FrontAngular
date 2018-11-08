import { Component, OnInit, Input } from '@angular/core';
import { IdUserService } from "../id-user.service";


@Component({
  selector: 'app-component-lunchroom-menu',
  templateUrl: './component-lunchroom-menu.component.html',
  styleUrls: ['./component-lunchroom-menu.component.css']
})
export class ComponentLunchroomMenuComponent implements OnInit {

  @Input () soup;
  @Input () appetizer;
  @Input () main_course;
  @Input () protein;
  @Input () juice;
  @Input () dessert;
  @Input () salad;
  

  price: number;
  line : number;
  
  constructor(private service: IdUserService) { 
  }
  
  ngOnInit() {
    this.price = this.service.get("price")
    this.line = this.service.get("line");
  }

}
