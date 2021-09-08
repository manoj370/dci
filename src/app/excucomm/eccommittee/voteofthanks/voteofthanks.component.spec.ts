import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteofthanksComponent } from './voteofthanks.component';

describe('VoteofthanksComponent', () => {
  let component: VoteofthanksComponent;
  let fixture: ComponentFixture<VoteofthanksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoteofthanksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoteofthanksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
