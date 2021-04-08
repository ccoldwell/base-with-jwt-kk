import { TestBed } from '@angular/core/testing';

import { OrgsService } from './orgs.service';

describe('OrgsService', () => {
  let service: OrgsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrgsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
