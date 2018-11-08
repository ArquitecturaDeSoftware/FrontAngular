import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentLunchroomTicketComponent } from './component-lunchroom-ticket.component';

describe('ComponentLunchroomTicketComponent', () => {
  let component: ComponentLunchroomTicketComponent;
  let fixture: ComponentFixture<ComponentLunchroomTicketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentLunchroomTicketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentLunchroomTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
