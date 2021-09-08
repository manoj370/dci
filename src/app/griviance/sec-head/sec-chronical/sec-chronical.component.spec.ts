import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecChronicalComponent } from './sec-chronical.component';

describe('SecChronicalComponent', () => {
  let component: SecChronicalComponent;
  let fixture: ComponentFixture<SecChronicalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecChronicalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecChronicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
