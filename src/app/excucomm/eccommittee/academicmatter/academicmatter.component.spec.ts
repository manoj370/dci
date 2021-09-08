import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicmatterComponent } from './academicmatter.component';

describe('AcademicmatterComponent', () => {
  let component: AcademicmatterComponent;
  let fixture: ComponentFixture<AcademicmatterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcademicmatterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademicmatterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
