import { Component, OnInit, Input } from '@angular/core';

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

  constructor() { 
  }

  ngOnInit() {
  }

}
