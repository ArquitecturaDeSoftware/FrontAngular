import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalLunchroomComponentComponent } from './modal-lunchroom-component.component';

describe('ModalLunchroomComponentComponent', () => {
  let component: ModalLunchroomComponentComponent;
  let fixture: ComponentFixture<ModalLunchroomComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalLunchroomComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalLunchroomComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
