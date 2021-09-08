import { TestBed } from '@angular/core/testing';

import { ExcComServiceService } from './exc-com-service.service';

describe('ExcComServiceService', () => {
  let service: ExcComServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExcComServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
