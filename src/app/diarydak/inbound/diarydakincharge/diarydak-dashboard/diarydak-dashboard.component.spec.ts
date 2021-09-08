import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiarydakDashboardComponent } from './diarydak-dashboard.component';

describe('DiarydakDashboardComponent', () => {
  let component: DiarydakDashboardComponent;
  let fixture: ComponentFixture<DiarydakDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiarydakDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiarydakDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
