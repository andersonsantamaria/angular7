import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

import { RoleGuard } from './role.guard';

describe('RoleGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoleGuard],
      imports: [HttpClientTestingModule, RouterTestingModule]
    });
  });

  it('should ...', inject([RoleGuard], (guard: RoleGuard) => {
    expect(guard).toBeTruthy();
  }));
});
