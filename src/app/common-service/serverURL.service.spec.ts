/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ServerURLService } from './serverURL.service';

describe('Service: ServerURL', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServerURLService]
    });
  });

  it('should ...', inject([ServerURLService], (service: ServerURLService) => {
    expect(service).toBeTruthy();
  }));
});
