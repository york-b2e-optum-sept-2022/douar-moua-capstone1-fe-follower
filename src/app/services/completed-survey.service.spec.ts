import { TestBed } from '@angular/core/testing';

import { CompletedSurveyService } from './completed-survey.service';

describe('CompletedSurveyService', () => {
  let service: CompletedSurveyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompletedSurveyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
