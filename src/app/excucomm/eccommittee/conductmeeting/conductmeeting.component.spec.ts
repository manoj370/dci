import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConductmeetingComponent } from './conductmeeting.component';

describe('ConductmeetingComponent', () => {
  let component: ConductmeetingComponent;
  let fixture: ComponentFixture<ConductmeetingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConductmeetingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConductmeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
