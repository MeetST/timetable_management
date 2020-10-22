import { TestBed } from '@angular/core/testing';

import { ProfessorManageService } from './professor-manage.service';

describe('ProfessorManageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProfessorManageService = TestBed.get(ProfessorManageService);
    expect(service).toBeTruthy();
  });
});
