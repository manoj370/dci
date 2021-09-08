import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClarificationlistComponent } from './clarificationlist.component';

describe('ClarificationlistComponent', () => {
  let component: ClarificationlistComponent;
  let fixture: ComponentFixture<ClarificationlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClarificationlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClarificationlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
