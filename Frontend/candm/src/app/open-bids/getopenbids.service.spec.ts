import { TestBed } from '@angular/core/testing';

import { GetopenbidsService } from './getopenbids.service';

describe('GetopenbidsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetopenbidsService = TestBed.get(GetopenbidsService);
    expect(service).toBeTruthy();
  });
});
