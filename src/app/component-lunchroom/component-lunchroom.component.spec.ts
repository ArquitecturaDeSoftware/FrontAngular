import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentLunchroomComponent } from './component-lunchroom.component';

describe('ComponentLunchroomComponent', () => {
  let component: ComponentLunchroomComponent;
  let fixture: ComponentFixture<ComponentLunchroomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentLunchroomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentLunchroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
