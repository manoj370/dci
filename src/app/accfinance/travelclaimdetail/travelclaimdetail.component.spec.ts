import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelclaimdetailComponent } from './travelclaimdetail.component';

describe('TravelclaimdetailComponent', () => {
  let component: TravelclaimdetailComponent;
  let fixture: ComponentFixture<TravelclaimdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelclaimdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelclaimdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
