import { TestBed } from '@angular/core/testing';

import { AppliedColorsService } from './applied-colors.service';

describe('AppliedColorsService', () => {
  let service: AppliedColorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppliedColorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
