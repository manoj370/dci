import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewdispatchComponent } from './newdispatch.component';

describe('NewdispatchComponent', () => {
  let component: NewdispatchComponent;
  let fixture: ComponentFixture<NewdispatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewdispatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewdispatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
