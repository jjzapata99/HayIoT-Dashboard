import { TestBed } from '@angular/core/testing';

import { ApiConectionService } from './api-conection.service';

describe('ApiConectionService', () => {
  let service: ApiConectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiConectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
