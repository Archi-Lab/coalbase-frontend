import {LearningOutcomeService} from './learning-outcome.service';
import {getTestBed, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {environment} from '../../../environments/environment';

describe('LearningOutcomeService', () => {
  let service: LearningOutcomeService;
  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LearningOutcomeService]
    });
    injector = getTestBed();
    service = injector.get(LearningOutcomeService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });
  it('Correct Resource address', () => {
    expect(service.uri).toBe(environment.coalbaseAPI + '/learningOutcomes');
  });

  it('Get Learning Outcomes', () => {
    const dummyLearningOutcomes = [
      {
        id: '3b5957ea-3643-441d-bc96-a3d8f2b6e712',
        competence: {
          action: 'Die Studierenden können Marketingentscheidungen informationsgestützt treffen',
          taxonomyLevel: 'SYNTHESIS'
        },
        tools: [
          'das Makro- und Mikroumfeld des relevanten Marktes so wie das eigenen Unternehmen analysieren',
          'Konsequenzen für die verschiedenen Bereiche der Marketingpolitik entwerfen'
        ],
        purpose: 'Produkte, Preise, Kommunikation und den Vertrieb bewusst marktorientiert zu gestalten'
      }
    ];

    service.learningOutcomes.subscribe(learningoutcome => {
      expect(learningoutcome.length).toBe(1);
      expect(learningoutcome).toEqual(dummyLearningOutcomes);
    });

    const req = httpMock.expectOne(`${service.uri}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyLearningOutcomes);
  });
});
