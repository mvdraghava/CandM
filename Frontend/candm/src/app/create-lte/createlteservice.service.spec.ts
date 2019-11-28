import { TestBed } from '@angular/core/testing';

import { CreatelteserviceService } from './createlteservice.service';

describe('CreatelteserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CreatelteserviceService = TestBed.get(CreatelteserviceService);
    expect(service).toBeTruthy();
  });
});
