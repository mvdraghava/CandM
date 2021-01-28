import { TestBed } from '@angular/core/testing';

import { CreatestServiceService } from './createst-service.service';

describe('CreatestServiceService', () => {
  let service: CreatestServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreatestServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
