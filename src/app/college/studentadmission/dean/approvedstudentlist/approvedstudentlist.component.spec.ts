import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedstudentlistComponent } from './approvedstudentlist.component';

describe('ApprovedstudentlistComponent', () => {
  let component: ApprovedstudentlistComponent;
  let fixture: ComponentFixture<ApprovedstudentlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovedstudentlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedstudentlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
