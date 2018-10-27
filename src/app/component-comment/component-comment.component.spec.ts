import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentCommentComponent } from './component-comment.component';

describe('ComponentCommentComponent', () => {
  let component: ComponentCommentComponent;
  let fixture: ComponentFixture<ComponentCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
