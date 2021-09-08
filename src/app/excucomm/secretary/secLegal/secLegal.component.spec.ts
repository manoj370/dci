/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SecLegalComponent } from './secLegal.component';

describe('SecLegalComponent', () => {
  let component: SecLegalComponent;
  let fixture: ComponentFixture<SecLegalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecLegalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecLegalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
