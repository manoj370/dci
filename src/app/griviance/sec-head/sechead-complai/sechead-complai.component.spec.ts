import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecheadComplaiComponent } from './sechead-complai.component';

describe('SecheadComplaiComponent', () => {
  let component: SecheadComplaiComponent;
  let fixture: ComponentFixture<SecheadComplaiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecheadComplaiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecheadComplaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
