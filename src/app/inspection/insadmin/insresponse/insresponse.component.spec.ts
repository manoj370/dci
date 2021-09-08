import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsresponseComponent } from './insresponse.component';

describe('InsresponseComponent', () => {
  let component: InsresponseComponent;
  let fixture: ComponentFixture<InsresponseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsresponseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsresponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
