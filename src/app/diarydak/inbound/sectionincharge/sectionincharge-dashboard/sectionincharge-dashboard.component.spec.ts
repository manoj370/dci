import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectioninchargeDashboardComponent } from './sectionincharge-dashboard.component';

describe('SectioninchargeDashboardComponent', () => {
  let component: SectioninchargeDashboardComponent;
  let fixture: ComponentFixture<SectioninchargeDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectioninchargeDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectioninchargeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
