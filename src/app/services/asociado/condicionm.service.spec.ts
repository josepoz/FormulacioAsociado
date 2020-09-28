import { TestBed } from '@angular/core/testing';

import { CondicionmService } from './condicionm.service';

describe('CondicionmService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CondicionmService = TestBed.get(CondicionmService);
    expect(service).toBeTruthy();
  });
});
