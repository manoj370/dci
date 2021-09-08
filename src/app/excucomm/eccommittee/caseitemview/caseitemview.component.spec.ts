import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseitemviewComponent } from './caseitemview.component';

describe('CaseitemviewComponent', () => {
  let component: CaseitemviewComponent;
  let fixture: ComponentFixture<CaseitemviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseitemviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseitemviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
