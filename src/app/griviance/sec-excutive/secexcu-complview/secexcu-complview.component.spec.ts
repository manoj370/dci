import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecexcuComplviewComponent } from './secexcu-complview.component';

describe('SecexcuComplviewComponent', () => {
  let component: SecexcuComplviewComponent;
  let fixture: ComponentFixture<SecexcuComplviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecexcuComplviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecexcuComplviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
