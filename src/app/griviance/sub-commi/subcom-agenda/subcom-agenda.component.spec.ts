import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcomAgendaComponent } from './subcom-agenda.component';

describe('SubcomAgendaComponent', () => {
  let component: SubcomAgendaComponent;
  let fixture: ComponentFixture<SubcomAgendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubcomAgendaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcomAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
