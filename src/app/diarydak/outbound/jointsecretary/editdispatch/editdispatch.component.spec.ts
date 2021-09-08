import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditdispatchComponent } from './editdispatch.component';

describe('EditdispatchComponent', () => {
  let component: EditdispatchComponent;
  let fixture: ComponentFixture<EditdispatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditdispatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditdispatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
