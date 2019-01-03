import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

import { ClienteService } from './cliente.service';

describe('ClienteService', () => {
  let originalTimeout;
  let service: ClienteService;
  let httpMock: HttpTestingController;
  beforeEach(async(() => {
      originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
      TestBed.configureTestingModule({
          imports: [HttpClientTestingModule, RouterTestingModule],
          providers: [ClienteService]
      });
      service = TestBed.get(ClienteService);
      httpMock = TestBed.get(HttpTestingController);
  }));

  it('should be created', () => {
    service = TestBed.get(ClienteService);
    expect(service).toBeTruthy();
  });
});
