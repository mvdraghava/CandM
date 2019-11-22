import { TestBed } from '@angular/core/testing';

import { VendorserviceService } from './vendorservice.service';

describe('VendorserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VendorserviceService = TestBed.get(VendorserviceService);
    expect(service).toBeTruthy();
  });
});
