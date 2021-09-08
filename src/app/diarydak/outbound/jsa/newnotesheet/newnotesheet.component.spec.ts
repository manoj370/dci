/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NewnotesheetComponent } from './newnotesheet.component';

describe('NewnotesheetComponent', () => {
  let component: NewnotesheetComponent;
  let fixture: ComponentFixture<NewnotesheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewnotesheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewnotesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
