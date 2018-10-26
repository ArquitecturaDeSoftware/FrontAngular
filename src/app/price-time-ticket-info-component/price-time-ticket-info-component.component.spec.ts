import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceTimeTicketInfoComponentComponent } from './price-time-ticket-info-component.component';

describe('PriceTimeTicketInfoComponentComponent', () => {
  let component: PriceTimeTicketInfoComponentComponent;
  let fixture: ComponentFixture<PriceTimeTicketInfoComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceTimeTicketInfoComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceTimeTicketInfoComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
