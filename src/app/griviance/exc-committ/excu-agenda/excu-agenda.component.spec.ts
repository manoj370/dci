import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcuAgendaComponent } from './excu-agenda.component';

describe('ExcuAgendaComponent', () => {
  let component: ExcuAgendaComponent;
  let fixture: ComponentFixture<ExcuAgendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExcuAgendaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcuAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
