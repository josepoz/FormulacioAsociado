import { TestBed } from '@angular/core/testing';

import { IdentificacionService } from './identificacion.service';

describe('IdentificacionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IdentificacionService = TestBed.get(IdentificacionService);
    expect(service).toBeTruthy();
  });
});
