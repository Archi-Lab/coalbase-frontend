import { TestBed } from '@angular/core/testing';

import { PredefinedExamFormService } from './predefined-exam-form.service';

describe('PredefinedExamFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PredefinedExamFormService = TestBed.get(PredefinedExamFormService);
    expect(service).toBeTruthy();
  });
});
