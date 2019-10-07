/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DateStringAdapterService } from './date-string-adapter.service';

describe('Service: DateStringAdapter', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DateStringAdapterService]
    });
  });

  it('should ...', inject([DateStringAdapterService], (service: DateStringAdapterService) => {
    expect(service).toBeTruthy();
  }));
});
