import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LunchroomComponentComponent } from './lunchroom-component.component';

describe('LunchroomComponentComponent', () => {
  let component: LunchroomComponentComponent;
  let fixture: ComponentFixture<LunchroomComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LunchroomComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LunchroomComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
