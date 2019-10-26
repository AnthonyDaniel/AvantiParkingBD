import { TestBed } from '@angular/core/testing';

import { ParqueosService } from './parqueos.service';

describe('ParqueosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ParqueosService = TestBed.get(ParqueosService);
    expect(service).toBeTruthy();
  });
});
