/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PerformanceTargetsService } from './performancetargets-service.service';

describe('Service: PerformanceTargetsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PerformanceTargetsService]
    });
  });

  it('should ...', inject([PerformanceTargetsService], (service: PerformanceTargetsService) => {
    expect(service).toBeTruthy();
  }));
});
