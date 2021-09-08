import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationmatterComponent } from './administrationmatter.component';

describe('AdministrationmatterComponent', () => {
  let component: AdministrationmatterComponent;
  let fixture: ComponentFixture<AdministrationmatterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrationmatterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrationmatterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
