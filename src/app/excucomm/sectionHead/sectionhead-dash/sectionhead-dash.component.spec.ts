import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionheadDashComponent } from './sectionhead-dash.component';

describe('SectionheadDashComponent', () => {
  let component: SectionheadDashComponent;
  let fixture: ComponentFixture<SectionheadDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionheadDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionheadDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
