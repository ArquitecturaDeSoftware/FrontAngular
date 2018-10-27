import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentLunchroomMenuComponent } from './component-lunchroom-menu.component';

describe('ComponentLunchroomMenuComponent', () => {
  let component: ComponentLunchroomMenuComponent;
  let fixture: ComponentFixture<ComponentLunchroomMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentLunchroomMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentLunchroomMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
