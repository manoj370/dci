import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccfinancematterComponent } from './accfinancematter.component';

describe('AccfinancematterComponent', () => {
  let component: AccfinancematterComponent;
  let fixture: ComponentFixture<AccfinancematterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccfinancematterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccfinancematterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
