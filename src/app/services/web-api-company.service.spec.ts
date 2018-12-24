import { TestBed, inject } from '@angular/core/testing';

import { WebApiCompanyService } from './web-api-company.service';

describe('WebApiCompanyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebApiCompanyService]
    });
  });

  it('should be created', inject([WebApiCompanyService], (service: WebApiCompanyService) => {
    expect(service).toBeTruthy();
  }));
});
