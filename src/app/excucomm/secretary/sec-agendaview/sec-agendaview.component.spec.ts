import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecAgendaviewComponent } from './sec-agendaview.component';

describe('SecAgendaviewComponent', () => {
  let component: SecAgendaviewComponent;
  let fixture: ComponentFixture<SecAgendaviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecAgendaviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecAgendaviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
