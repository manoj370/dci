import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplainantNewcomplComponent } from './complainant-newcompl.component';

describe('ComplainantNewcomplComponent', () => {
  let component: ComplainantNewcomplComponent;
  let fixture: ComponentFixture<ComplainantNewcomplComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplainantNewcomplComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplainantNewcomplComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
