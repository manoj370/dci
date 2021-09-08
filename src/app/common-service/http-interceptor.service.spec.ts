import { TestBed } from '@angular/core/testing';

import { CommonInterceptor } from './http-interceptor.service';

describe('CommonInterceptor', () => {
  let service: CommonInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonInterceptor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
