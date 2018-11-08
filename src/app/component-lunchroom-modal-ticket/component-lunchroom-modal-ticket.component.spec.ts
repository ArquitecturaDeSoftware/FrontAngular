import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentLunchroomModalTicketComponent } from './component-lunchroom-modal-ticket.component';

describe('ComponentLunchroomModalTicketComponent', () => {
  let component: ComponentLunchroomModalTicketComponent;
  let fixture: ComponentFixture<ComponentLunchroomModalTicketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentLunchroomModalTicketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentLunchroomModalTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
