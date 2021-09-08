/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SecAdminstrationComponent } from './secAdminstration.component';

describe('SecAdminstrationComponent', () => {
  let component: SecAdminstrationComponent;
  let fixture: ComponentFixture<SecAdminstrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecAdminstrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecAdminstrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
