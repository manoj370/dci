import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcuDashComponent } from './excu-dash.component';

describe('ExcuDashComponent', () => {
  let component: ExcuDashComponent;
  let fixture: ComponentFixture<ExcuDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExcuDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcuDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
