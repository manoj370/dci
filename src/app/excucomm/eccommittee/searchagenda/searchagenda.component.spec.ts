import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchagendaComponent } from './searchagenda.component';

describe('SearchagendaComponent', () => {
  let component: SearchagendaComponent;
  let fixture: ComponentFixture<SearchagendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchagendaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchagendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
