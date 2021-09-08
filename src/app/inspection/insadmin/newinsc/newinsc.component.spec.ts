import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewinscComponent } from './newinsc.component';

describe('NewinscComponent', () => {
  let component: NewinscComponent;
  let fixture: ComponentFixture<NewinscComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewinscComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewinscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
