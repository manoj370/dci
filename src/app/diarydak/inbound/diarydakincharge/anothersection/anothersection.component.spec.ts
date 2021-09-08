import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnothersectionComponent } from './anothersection.component';

describe('AnothersectionComponent', () => {
  let component: AnothersectionComponent;
  let fixture: ComponentFixture<AnothersectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnothersectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnothersectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
