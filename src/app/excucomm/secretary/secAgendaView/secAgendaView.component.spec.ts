/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SecAgendaViewComponent } from './secAgendaView.component';

describe('SecAgendaViewComponent', () => {
  let component: SecAgendaViewComponent;
  let fixture: ComponentFixture<SecAgendaViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecAgendaViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecAgendaViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
