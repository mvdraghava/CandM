import { TestBed } from '@angular/core/testing';

import { DetailsserviceService } from './detailsservice.service';

describe('DetailsserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DetailsserviceService = TestBed.get(DetailsserviceService);
    expect(service).toBeTruthy();
  });
});
