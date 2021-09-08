/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SecARPLComponent } from './secARPL.component';

describe('SecARPLComponent', () => {
  let component: SecARPLComponent;
  let fixture: ComponentFixture<SecARPLComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecARPLComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecARPLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
