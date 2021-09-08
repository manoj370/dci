import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessHistoryComponent } from './process-history.component';

describe('ProcessHistoryComponent', () => {
  let component: ProcessHistoryComponent;
  let fixture: ComponentFixture<ProcessHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
