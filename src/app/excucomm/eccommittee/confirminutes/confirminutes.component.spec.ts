import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirminutesComponent } from './confirminutes.component';

describe('ConfirminutesComponent', () => {
  let component: ConfirminutesComponent;
  let fixture: ComponentFixture<ConfirminutesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirminutesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirminutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
