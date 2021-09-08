import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OthersecdispatchComponent } from './othersecdispatch.component';

describe('OthersecdispatchComponent', () => {
  let component: OthersecdispatchComponent;
  let fixture: ComponentFixture<OthersecdispatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OthersecdispatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OthersecdispatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
