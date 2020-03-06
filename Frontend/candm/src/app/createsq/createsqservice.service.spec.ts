import { TestBed } from '@angular/core/testing';

import { CreatesqserviceService } from './createsqservice.service';

describe('CreatesqserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CreatesqserviceService = TestBed.get(CreatesqserviceService);
    expect(service).toBeTruthy();
  });
});
