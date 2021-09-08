import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewsheduleComponent } from './viewshedule.component';

describe('ViewsheduleComponent', () => {
  let component: ViewsheduleComponent;
  let fixture: ComponentFixture<ViewsheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewsheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewsheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
