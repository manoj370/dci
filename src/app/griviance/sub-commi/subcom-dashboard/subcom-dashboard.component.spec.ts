import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcomDashboardComponent } from './subcom-dashboard.component';

describe('SubcomDashboardComponent', () => {
  let component: SubcomDashboardComponent;
  let fixture: ComponentFixture<SubcomDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubcomDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcomDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
