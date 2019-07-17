import { TestBed } from '@angular/core/testing';

import { NachrichtenService } from './nachrichten.service';

describe('NachrichtenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NachrichtenService = TestBed.get(NachrichtenService);
    expect(service).toBeTruthy();
  });
});
