import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadmeetingComponent } from './downloadmeeting.component';

describe('DownloadmeetingComponent', () => {
  let component: DownloadmeetingComponent;
  let fixture: ComponentFixture<DownloadmeetingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadmeetingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadmeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
