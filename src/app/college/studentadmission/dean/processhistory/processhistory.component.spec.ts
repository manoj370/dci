import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcesshistoryComponent } from './processhistory.component';

describe('ProcesshistoryComponent', () => {
  let component: ProcesshistoryComponent;
  let fixture: ComponentFixture<ProcesshistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcesshistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcesshistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
