import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedispatchComponent } from './createdispatch.component';

describe('CreatedispatchComponent', () => {
  let component: CreatedispatchComponent;
  let fixture: ComponentFixture<CreatedispatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatedispatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatedispatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
