import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplainantComplviewComponent } from './complainant-complview.component';

describe('ComplainantComplviewComponent', () => {
  let component: ComplainantComplviewComponent;
  let fixture: ComponentFixture<ComplainantComplviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplainantComplviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplainantComplviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
