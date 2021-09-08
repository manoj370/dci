import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackNotesheetComponent } from './track-notesheet.component';

describe('TrackNotesheetComponent', () => {
  let component: TrackNotesheetComponent;
  let fixture: ComponentFixture<TrackNotesheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackNotesheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackNotesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
