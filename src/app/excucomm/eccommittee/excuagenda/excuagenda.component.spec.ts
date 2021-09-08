import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcuagendaComponent } from './excuagenda.component';

describe('ExcuagendaComponent', () => {
  let component: ExcuagendaComponent;
  let fixture: ComponentFixture<ExcuagendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExcuagendaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcuagendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
