/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SecprocessComponent } from './secprocess.component';

describe('SecprocessComponent', () => {
  let component: SecprocessComponent;
  let fixture: ComponentFixture<SecprocessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecprocessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecprocessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
