import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecAgendaViewComponent } from './sec-agenda-view.component';

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
