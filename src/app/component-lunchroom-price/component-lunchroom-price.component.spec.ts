import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentLunchroomPriceComponent } from './component-lunchroom-price.component';

describe('ComponentLunchroomPriceComponent', () => {
  let component: ComponentLunchroomPriceComponent;
  let fixture: ComponentFixture<ComponentLunchroomPriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentLunchroomPriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentLunchroomPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
