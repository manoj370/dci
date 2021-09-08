import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelclaimviewComponent } from './travelclaimview.component';

describe('TravelclaimviewComponent', () => {
  let component: TravelclaimviewComponent;
  let fixture: ComponentFixture<TravelclaimviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelclaimviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelclaimviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
