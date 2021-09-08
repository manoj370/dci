/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { InsadminService } from './insadmin.service';

describe('Service: Insadmin', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InsadminService]
    });
  });

  it('should ...', inject([InsadminService], (service: InsadminService) => {
    expect(service).toBeTruthy();
  }));
});
