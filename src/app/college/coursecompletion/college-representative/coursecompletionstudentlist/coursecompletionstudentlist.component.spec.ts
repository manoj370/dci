import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursecompletionstudentlistComponent } from './coursecompletionstudentlist.component';

describe('CoursecompletionstudentlistComponent', () => {
  let component: CoursecompletionstudentlistComponent;
  let fixture: ComponentFixture<CoursecompletionstudentlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursecompletionstudentlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursecompletionstudentlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
