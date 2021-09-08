import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoterecordapologiesComponent } from './noterecordapologies.component';

describe('NoterecordapologiesComponent', () => {
  let component: NoterecordapologiesComponent;
  let fixture: ComponentFixture<NoterecordapologiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoterecordapologiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoterecordapologiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
