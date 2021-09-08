import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectioninchargeViewreceiptComponent } from './sectionincharge-viewreceipt.component';

describe('SectioninchargeViewreceiptComponent', () => {
  let component: SectioninchargeViewreceiptComponent;
  let fixture: ComponentFixture<SectioninchargeViewreceiptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectioninchargeViewreceiptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectioninchargeViewreceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
