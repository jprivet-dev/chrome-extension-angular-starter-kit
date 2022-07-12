import { TestBed } from '@angular/core/testing';

import { CurrentTabService } from './current-tab.service';

describe('CurrentTabService', () => {
  let service: CurrentTabService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentTabService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
