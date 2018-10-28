import { Component, OnInit, Input } from '@angular/core';
import { IdUserService } from "../id-user.service";

@Component({
  selector: 'app-component-lunchroom',
  templateUrl: './component-lunchroom.component.html',
  styleUrls: ['./component-lunchroom.component.css']
})
export class ComponentLunchroomComponent implements OnInit {

  @Input () id_lunchroom;
  @Input () name_lunchroom;
  @Input () num_ed;
  @Input () index;

  active = false;
  src = this.service.src;

  constructor(private service: IdUserService) { }

  ngOnInit() {            
  }

  onClick(){
    this.active = true;
    this.service.set("id_lunchroom", this.id_lunchroom);    
  }

}
