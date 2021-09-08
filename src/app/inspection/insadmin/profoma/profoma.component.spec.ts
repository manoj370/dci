import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfomaComponent } from './profoma.component';

describe('ProfomaComponent', () => {
  let component: ProfomaComponent;
  let fixture: ComponentFixture<ProfomaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfomaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfomaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
