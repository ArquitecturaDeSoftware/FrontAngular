import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-component-lunchroom-ticket',
  templateUrl: './component-lunchroom-ticket.component.html',
  styleUrls: ['./component-lunchroom-ticket.component.css']
})
export class ComponentLunchroomTicketComponent implements OnInit {

  @Input() name_ticket;

  constructor() { }

  ngOnInit() {
  }

}
