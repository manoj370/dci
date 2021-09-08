/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SecAOBComponent } from './secAOB.component';

describe('SecAOBComponent', () => {
  let component: SecAOBComponent;
  let fixture: ComponentFixture<SecAOBComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecAOBComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecAOBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
