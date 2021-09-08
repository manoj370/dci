import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyotherbusinessComponent } from './anyotherbusiness.component';

describe('AnyotherbusinessComponent', () => {
  let component: AnyotherbusinessComponent;
  let fixture: ComponentFixture<AnyotherbusinessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnyotherbusinessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnyotherbusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
