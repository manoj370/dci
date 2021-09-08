/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TravelagentviewComponent } from './travelagentview.component';

describe('TravelagentviewComponent', () => {
  let component: TravelagentviewComponent;
  let fixture: ComponentFixture<TravelagentviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelagentviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelagentviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
