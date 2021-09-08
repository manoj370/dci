import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintaindatevenueComponent } from './maintaindatevenue.component';

describe('MaintaindatevenueComponent', () => {
  let component: MaintaindatevenueComponent;
  let fixture: ComponentFixture<MaintaindatevenueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintaindatevenueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintaindatevenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
