import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollcompComponent } from './collcomp.component';

describe('CollcompComponent', () => {
  let component: CollcompComponent;
  let fixture: ComponentFixture<CollcompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollcompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollcompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
