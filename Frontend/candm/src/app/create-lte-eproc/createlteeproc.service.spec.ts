import { TestBed } from '@angular/core/testing';

import { CreatelteeprocService } from './createlteeproc.service';

describe('CreatelteeprocService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CreatelteeprocService = TestBed.get(CreatelteeprocService);
    expect(service).toBeTruthy();
  });
});
