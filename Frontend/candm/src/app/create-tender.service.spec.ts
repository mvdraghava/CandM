import { TestBed } from '@angular/core/testing';

import { CreateTenderService } from './create-tender.service';

describe('CreateTenderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CreateTenderService = TestBed.get(CreateTenderService);
    expect(service).toBeTruthy();
  });
});
