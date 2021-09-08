import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNoteSheetComponent } from './create-note-sheet.component';

describe('CreateNoteSheetComponent', () => {
  let component: CreateNoteSheetComponent;
  let fixture: ComponentFixture<CreateNoteSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNoteSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNoteSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
