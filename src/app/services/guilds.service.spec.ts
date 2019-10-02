import { TestBed } from '@angular/core/testing';

import { GuildsService } from './guilds.service';

describe('GuildsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GuildsService = TestBed.get(GuildsService);
    expect(service).toBeTruthy();
  });
});
