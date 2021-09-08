/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CollegeServiceService } from './collegeService.service';

describe('Service: CollegeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CollegeServiceService]
    });
  });

  it('should ...', inject([CollegeServiceService], (service: CollegeServiceService) => {
    expect(service).toBeTruthy();
  }));
});
