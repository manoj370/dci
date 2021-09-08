import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DischargestudentslistComponent } from './dischargestudentslist.component';

describe('DischargestudentslistComponent', () => {
  let component: DischargestudentslistComponent;
  let fixture: ComponentFixture<DischargestudentslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DischargestudentslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DischargestudentslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
