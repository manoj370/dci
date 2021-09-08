import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecheadDashboardComponent } from './sechead-dashboard.component';

describe('SecheadDashboardComponent', () => {
  let component: SecheadDashboardComponent;
  let fixture: ComponentFixture<SecheadDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecheadDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecheadDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
