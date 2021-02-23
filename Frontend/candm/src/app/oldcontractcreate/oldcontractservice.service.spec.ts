import { TestBed } from '@angular/core/testing';

import { OldcontractserviceService } from './oldcontractservice.service';

describe('OldcontractserviceService', () => {
  let service: OldcontractserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OldcontractserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
