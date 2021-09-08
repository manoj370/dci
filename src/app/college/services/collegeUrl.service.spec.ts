/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CollegeUrlService } from './collegeUrl.service';

describe('Service: CollegeUrl', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CollegeUrlService]
    });
  });

  it('should ...', inject([CollegeUrlService], (service: CollegeUrlService) => {
    expect(service).toBeTruthy();
  }));
});
