import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretaryviewreceiptComponent } from './secretaryviewreceipt.component';

describe('SecretaryviewreceiptComponent', () => {
  let component: SecretaryviewreceiptComponent;
  let fixture: ComponentFixture<SecretaryviewreceiptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecretaryviewreceiptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecretaryviewreceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
