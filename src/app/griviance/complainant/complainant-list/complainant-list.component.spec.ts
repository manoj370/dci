import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplainantListComponent } from './complainant-list.component';

describe('ComplainantListComponent', () => {
  let component: ComplainantListComponent;
  let fixture: ComponentFixture<ComplainantListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplainantListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplainantListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
