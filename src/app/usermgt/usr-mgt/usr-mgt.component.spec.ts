import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsrMgtComponent } from './usr-mgt.component';

describe('UsrMgtComponent', () => {
  let component: UsrMgtComponent;
  let fixture: ComponentFixture<UsrMgtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsrMgtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsrMgtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
