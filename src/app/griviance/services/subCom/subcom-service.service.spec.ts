import { TestBed } from '@angular/core/testing';

import { SubcomServiceService } from './subcom-service.service';

describe('SubcomServiceService', () => {
  let service: SubcomServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubcomServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
