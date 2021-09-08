import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelagentclaimComponent } from './travelagentclaim.component';

describe('TravelagentclaimComponent', () => {
  let component: TravelagentclaimComponent;
  let fixture: ComponentFixture<TravelagentclaimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelagentclaimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelagentclaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
