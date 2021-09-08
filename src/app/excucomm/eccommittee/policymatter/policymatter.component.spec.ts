import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicymatterComponent } from './policymatter.component';

describe('PolicymatterComponent', () => {
  let component: PolicymatterComponent;
  let fixture: ComponentFixture<PolicymatterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicymatterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicymatterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
