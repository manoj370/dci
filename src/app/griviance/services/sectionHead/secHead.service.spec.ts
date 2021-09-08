/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SecHeadService } from './secHead.service';

describe('Service: SecHead', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SecHeadService]
    });
  });

  it('should ...', inject([SecHeadService], (service: SecHeadService) => {
    expect(service).toBeTruthy();
  }));
});
