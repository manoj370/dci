/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SecAcademicComponent } from './secAcademic.component';

describe('SecAcademicComponent', () => {
  let component: SecAcademicComponent;
  let fixture: ComponentFixture<SecAcademicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecAcademicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecAcademicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
