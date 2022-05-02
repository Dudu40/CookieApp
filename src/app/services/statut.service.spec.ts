import { TestBed } from '@angular/core/testing';

import { StatutService } from './statut.service';

describe('StatutService', () => {
  let service: StatutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
