import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLunchroomsComponent } from './view-lunchrooms.component';

describe('ViewLunchroomsComponent', () => {
  let component: ViewLunchroomsComponent;
  let fixture: ComponentFixture<ViewLunchroomsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewLunchroomsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLunchroomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
