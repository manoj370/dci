import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalDashComponent } from './internal-dash.component';

describe('InternalDashComponent', () => {
  let component: InternalDashComponent;
  let fixture: ComponentFixture<InternalDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternalDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
