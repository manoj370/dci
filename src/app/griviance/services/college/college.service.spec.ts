/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CollegeService } from './college.service';

describe('Service: College', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CollegeService]
    });
  });

  it('should ...', inject([CollegeService], (service: CollegeService) => {
    expect(service).toBeTruthy();
  }));
});
