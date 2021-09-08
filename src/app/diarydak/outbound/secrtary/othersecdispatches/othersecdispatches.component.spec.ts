import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OthersecdispatchesComponent } from './othersecdispatches.component';

describe('OthersecdispatchesComponent', () => {
  let component: OthersecdispatchesComponent;
  let fixture: ComponentFixture<OthersecdispatchesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OthersecdispatchesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OthersecdispatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
