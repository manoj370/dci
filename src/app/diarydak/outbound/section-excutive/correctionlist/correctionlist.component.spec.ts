import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrectionlistComponent } from './correctionlist.component';

describe('CorrectionlistComponent', () => {
  let component: CorrectionlistComponent;
  let fixture: ComponentFixture<CorrectionlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorrectionlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorrectionlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
