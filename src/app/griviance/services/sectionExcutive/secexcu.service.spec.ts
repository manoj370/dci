/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SecexcuService } from './secexcu.service';

describe('Service: Secexcu', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SecexcuService]
    });
  });

  it('should ...', inject([SecexcuService], (service: SecexcuService) => {
    expect(service).toBeTruthy();
  }));
});
