/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SecConfirmMinComponent } from './secConfirmMin.component';

describe('SecConfirmMinComponent', () => {
  let component: SecConfirmMinComponent;
  let fixture: ComponentFixture<SecConfirmMinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecConfirmMinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecConfirmMinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
