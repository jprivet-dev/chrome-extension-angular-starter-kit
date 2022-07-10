import { TestBed } from '@angular/core/testing';

import { AppliedColorsStoreService } from './applied-colors-store.service';

describe('AppliedColorsService', () => {
  let service: AppliedColorsStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppliedColorsStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
