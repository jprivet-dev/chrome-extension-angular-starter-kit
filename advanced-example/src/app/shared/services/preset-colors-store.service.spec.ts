import { TestBed } from '@angular/core/testing';

import { PresetColorsStoreService } from './preset-colors-store.service';

describe('PresetColorsStoreService', () => {
  let service: PresetColorsStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PresetColorsStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
