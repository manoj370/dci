import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecexecutiveViewreceiptComponent } from './secexecutive-viewreceipt.component';

describe('SecexecutiveViewreceiptComponent', () => {
  let component: SecexecutiveViewreceiptComponent;
  let fixture: ComponentFixture<SecexecutiveViewreceiptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecexecutiveViewreceiptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecexecutiveViewreceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
