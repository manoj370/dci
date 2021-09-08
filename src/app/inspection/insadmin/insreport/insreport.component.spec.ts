import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsreportComponent } from './insreport.component';

describe('InsreportComponent', () => {
  let component: InsreportComponent;
  let fixture: ComponentFixture<InsreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
