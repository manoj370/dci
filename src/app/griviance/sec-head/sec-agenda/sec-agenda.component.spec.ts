import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecAgendaComponent } from './sec-agenda.component';

describe('SecAgendaComponent', () => {
  let component: SecAgendaComponent;
  let fixture: ComponentFixture<SecAgendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecAgendaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
