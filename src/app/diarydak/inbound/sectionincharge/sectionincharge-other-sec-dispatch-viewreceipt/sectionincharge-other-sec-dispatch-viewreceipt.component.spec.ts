import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectioninchargeOtherSecDispatchViewreceiptComponent } from './sectionincharge-other-sec-dispatch-viewreceipt.component';

describe('SectioninchargeOtherSecDispatchViewreceiptComponent', () => {
  let component: SectioninchargeOtherSecDispatchViewreceiptComponent;
  let fixture: ComponentFixture<SectioninchargeOtherSecDispatchViewreceiptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectioninchargeOtherSecDispatchViewreceiptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectioninchargeOtherSecDispatchViewreceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
