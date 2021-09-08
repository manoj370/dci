import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecexecutiveDashboardComponent } from './secexecutive-dashboard.component';

describe('SecexecutiveDashboardComponent', () => {
  let component: SecexecutiveDashboardComponent;
  let fixture: ComponentFixture<SecexecutiveDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecexecutiveDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecexecutiveDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
