import { TestBed } from '@angular/core/testing';

import { PresetColorsService } from './preset-colors.service';

describe('PresetColorsService', () => {
  let service: PresetColorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PresetColorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
