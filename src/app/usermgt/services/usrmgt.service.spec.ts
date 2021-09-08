import { TestBed } from '@angular/core/testing';

import { UsrmgtService } from './usrmgt.service';

describe('UsrmgtService', () => {
  let service: UsrmgtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsrmgtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
