/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SecSupplementaryComponent } from './secSupplementary.component';

describe('SecSupplementaryComponent', () => {
  let component: SecSupplementaryComponent;
  let fixture: ComponentFixture<SecSupplementaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecSupplementaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecSupplementaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
