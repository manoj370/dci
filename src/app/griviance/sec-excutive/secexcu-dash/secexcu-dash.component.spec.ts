import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecexcuDashComponent } from './secexcu-dash.component';

describe('SecexcuDashComponent', () => {
  let component: SecexcuDashComponent;
  let fixture: ComponentFixture<SecexcuDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecexcuDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecexcuDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
