/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TravelagentService } from './travelagent.service';

describe('Service: Travelagent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TravelagentService]
    });
  });

  it('should ...', inject([TravelagentService], (service: TravelagentService) => {
    expect(service).toBeTruthy();
  }));
});
