/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { JobService } from './Job.service';

describe('Service: Job', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JobService]
    });
  });

  it('should ...', inject([JobService], (service: JobService) => {
    expect(service).toBeTruthy();
  }));
});
