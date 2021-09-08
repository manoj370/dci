import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollDashComponent } from './coll-dash.component';

describe('CollDashComponent', () => {
  let component: CollDashComponent;
  let fixture: ComponentFixture<CollDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
