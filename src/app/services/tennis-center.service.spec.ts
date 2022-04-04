import { TestBed } from '@angular/core/testing';

import { TennisCenterService } from './tennis-center.service';

describe('TennisCenterService', () => {
  let service: TennisCenterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TennisCenterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
