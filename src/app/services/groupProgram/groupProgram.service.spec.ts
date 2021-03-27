import { TestBed } from '@angular/core/testing';

import { GroupProgramService } from './groupProgram.service';

describe('GroupProgramService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GroupProgramService = TestBed.inject(GroupProgramService);
    expect(service).toBeTruthy();
  });
});
