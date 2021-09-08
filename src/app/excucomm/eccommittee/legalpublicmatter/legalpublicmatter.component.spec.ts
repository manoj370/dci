import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalpublicmatterComponent } from './legalpublicmatter.component';

describe('LegalpublicmatterComponent', () => {
  let component: LegalpublicmatterComponent;
  let fixture: ComponentFixture<LegalpublicmatterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LegalpublicmatterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegalpublicmatterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
