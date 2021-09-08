/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SecA&FComponent } from './secA&F.component';

describe('SecA&FComponent', () => {
  let component: SecA&FComponent;
  let fixture: ComponentFixture<SecA&FComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecA&FComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecA&FComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
