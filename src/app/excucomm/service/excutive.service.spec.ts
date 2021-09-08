/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ExcutiveService } from './excutive.service';

describe('Service: Excutive', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExcutiveService]
    });
  });

  it('should ...', inject([ExcutiveService], (service: ExcutiveService) => {
    expect(service).toBeTruthy();
  }));
});
