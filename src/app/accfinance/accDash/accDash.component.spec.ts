/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AccDashComponent } from './accDash.component';

describe('AccDashComponent', () => {
  let component: AccDashComponent;
  let fixture: ComponentFixture<AccDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
