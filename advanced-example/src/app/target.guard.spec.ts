import { TestBed } from '@angular/core/testing';

import { TargetGuard } from './target.guard';

describe('TargetGuard', () => {
  let guard: TargetGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TargetGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
