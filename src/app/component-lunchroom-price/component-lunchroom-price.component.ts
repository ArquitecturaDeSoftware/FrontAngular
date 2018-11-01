import { Component, OnInit, Input } from '@angular/core';
import { IdUserService } from "../id-user.service";

@Component({
  selector: 'app-component-lunchroom-price',
  templateUrl: './component-lunchroom-price.component.html',
  styleUrls: ['./component-lunchroom-price.component.css']
})
export class ComponentLunchroomPriceComponent implements OnInit {

  user_id = this.service.get("ced_user");
  id_lunchroom = this.service.get("id_lunchroom");
  price = this.service.get("price");
  line = this.service.get("line");
  time = this.line * 1;

  constructor(private service: IdUserService) { }

  ngOnInit() {   
    setInterval(data => {
      this.line = this.service.get("line");
      this.time = this.line * 1;
    },500)
  }

}
