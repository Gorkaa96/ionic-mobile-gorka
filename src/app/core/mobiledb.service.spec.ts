import { TestBed } from '@angular/core/testing';

import { MobiledbService } from './mobiledb.service';

describe('MobiledbService', () => {
  let service: MobiledbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MobiledbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
