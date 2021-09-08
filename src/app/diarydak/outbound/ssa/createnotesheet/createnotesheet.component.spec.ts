import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatenotesheetComponent } from './createnotesheet.component';

describe('CreatenotesheetComponent', () => {
  let component: CreatenotesheetComponent;
  let fixture: ComponentFixture<CreatenotesheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatenotesheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatenotesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
