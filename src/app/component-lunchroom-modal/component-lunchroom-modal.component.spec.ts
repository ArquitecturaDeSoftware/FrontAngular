import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentLunchroomModalComponent } from './component-lunchroom-modal.component';

describe('ComponentLunchroomModalComponent', () => {
  let component: ComponentLunchroomModalComponent;
  let fixture: ComponentFixture<ComponentLunchroomModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentLunchroomModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentLunchroomModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
