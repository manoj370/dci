/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GlobalErrorService } from './globalError.service';

describe('Service: GlobalError', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GlobalErrorService]
    });
  });

  it('should ...', inject([GlobalErrorService], (service: GlobalErrorService) => {
    expect(service).toBeTruthy();
  }));
});
