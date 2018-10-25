import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LunchroomsViewComponent } from './lunchrooms-view.component';

describe('LunchroomsViewComponent', () => {
  let component: LunchroomsViewComponent;
  let fixture: ComponentFixture<LunchroomsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LunchroomsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LunchroomsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
