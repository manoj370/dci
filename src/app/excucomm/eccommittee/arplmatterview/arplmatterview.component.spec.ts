import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArplmatterviewComponent } from './arplmatterview.component';

describe('ArplmatterviewComponent', () => {
  let component: ArplmatterviewComponent;
  let fixture: ComponentFixture<ArplmatterviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArplmatterviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArplmatterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
