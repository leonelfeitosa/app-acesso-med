import { TestBed } from '@angular/core/testing';

import { ComprovanteService } from './comprovante.service';

describe('ComprovanteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ComprovanteService = TestBed.get(ComprovanteService);
    expect(service).toBeTruthy();
  });
});
