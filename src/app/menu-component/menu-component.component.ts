import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-menu-component',
  templateUrl: './menu-component.component.html',
  styleUrls: ['./menu-component.component.css']
})
export class MenuComponentComponent implements OnInit {

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
