import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentAdminEditmenuComponent } from './component-admin-editmenu.component';

describe('ComponentAdminEditmenuComponent', () => {
  let component: ComponentAdminEditmenuComponent;
  let fixture: ComponentFixture<ComponentAdminEditmenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentAdminEditmenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentAdminEditmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
