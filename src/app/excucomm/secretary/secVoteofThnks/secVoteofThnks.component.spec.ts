/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SecVoteofThnksComponent } from './secVoteofThnks.component';

describe('SecVoteofThnksComponent', () => {
  let component: SecVoteofThnksComponent;
  let fixture: ComponentFixture<SecVoteofThnksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecVoteofThnksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecVoteofThnksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
