import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArplmatterComponent } from './arplmatter.component';

describe('ArplmatterComponent', () => {
  let component: ArplmatterComponent;
  let fixture: ComponentFixture<ArplmatterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArplmatterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArplmatterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
