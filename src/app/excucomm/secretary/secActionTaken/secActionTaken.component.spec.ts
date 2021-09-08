/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SecActionTakenComponent } from './secActionTaken.component';

describe('SecActionTakenComponent', () => {
  let component: SecActionTakenComponent;
  let fixture: ComponentFixture<SecActionTakenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecActionTakenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecActionTakenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
