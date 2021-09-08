import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionmatterComponent } from './inspectionmatter.component';

describe('InspectionmatterComponent', () => {
  let component: InspectionmatterComponent;
  let fixture: ComponentFixture<InspectionmatterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectionmatterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionmatterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
