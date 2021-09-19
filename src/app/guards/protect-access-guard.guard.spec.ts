import { TestBed } from '@angular/core/testing';

import { ProtectAccessGuardGuard } from './protect-access-guard.guard';

describe('ProtectAccessGuardGuard', () => {
  let guard: ProtectAccessGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ProtectAccessGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
