import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHomeLoginAdminComponent } from './view-home-login-admin.component';

describe('ViewHomeLoginAdminComponent', () => {
  let component: ViewHomeLoginAdminComponent;
  let fixture: ComponentFixture<ViewHomeLoginAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewHomeLoginAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewHomeLoginAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
