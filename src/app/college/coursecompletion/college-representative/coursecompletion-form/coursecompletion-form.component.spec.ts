import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursecompletionFormComponent } from './coursecompletion-form.component';

describe('CoursecompletionFormComponent', () => {
  let component: CoursecompletionFormComponent;
  let fixture: ComponentFixture<CoursecompletionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursecompletionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursecompletionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
