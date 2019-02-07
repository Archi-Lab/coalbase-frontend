import {TestBed} from '@angular/core/testing';

import {LearningOutcomeService} from './learning-outcome.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ExternalConfigurationService} from '../external-configuration.service';
import {AngularHalModule} from 'angular4-hal';
import {environment} from '../../../../environments/environment';
import {LearningOutcome} from '../../../shared/models/learning-outcome.model';

describe('Service: Learning Outcome', () => {
  let service: LearningOutcomeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        AngularHalModule.forRoot()
      ],
      providers: [
        LearningOutcomeService,
        {
          provide: 'ExternalConfigurationService',
          useClass: ExternalConfigurationService
        },
      ]
    });
    service = TestBed.get(LearningOutcomeService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Service should be created', () => {
    expect(service).toBeTruthy();
  });
  it('Get Learning Outcomes', () => {
    const serverResponse = {
      '_embedded': {
        'learningOutcomes': [
          {
            'competence': {
              'action': 'action1',
              'taxonomyLevel': 'ANALYSIS'
            },
            'tools': [
              {
                'value': 'tool1'
              }
            ],
            'purpose': {
              'value': 'purpose1'
            },
            '_links': {
              'self': {
                'href': 'http://localhost:8080/learningOutcomes/b37551ca-6e59-4c65-bffe-97f577433c5b'
              },
              'learningOutcome': {
                'href': 'http://localhost:8080/learningOutcomes/b37551ca-6e59-4c65-bffe-97f577433c5b'
              }
            }
          },
          {
            'competence': {
              'action': 'action1',
              'taxonomyLevel': 'ANALYSIS'
            },
            'tools': [
              {
                'value': 'tool1'
              }
            ],
            'purpose': {
              'value': 'purpose1'
            },
            '_links': {
              'self': {
                'href': 'http://localhost:8080/learningOutcomes/b37551ca-6e59-4c65-bffe-97f577433c5b'
              },
              'learningOutcome': {
                'href': 'http://localhost:8080/learningOutcomes/b37551ca-6e59-4c65-bffe-97f577433c5b'
              }
            }
          }
        ]
      },
      '_links': {
        'self': {
          'href': 'http://localhost:8080/learningOutcomes'
        },
        'profile': {
          'href': 'http://localhost:8080/profile/learningOutcomes'
        }
      }
    };
    const serviceExpectedReturnValue = [
      new LearningOutcome(
        {action: 'action1', taxonomyLevel: 'ANALYSIS'},
        [{value: 'tool1'}],
        {value: 'purpose1'},
        {
          self: {
            href: 'http://localhost:8080/learningOutcomes/b37551ca-6e59-4c65-bffe-97f577433c5b'
          },
          learningOutcome: {
            href: 'http://localhost:8080/learningOutcomes/b37551ca-6e59-4c65-bffe-97f577433c5b'
          }
        }
      ),
      new LearningOutcome(
        {action: 'action1', taxonomyLevel: 'ANALYSIS'},
        [{value: 'tool1'}],
        {value: 'purpose1'},
        {
          self: {
            href: 'http://localhost:8080/learningOutcomes/b37551ca-6e59-4c65-bffe-97f577433c5b'
          },
          learningOutcome: {
            href: 'http://localhost:8080/learningOutcomes/b37551ca-6e59-4c65-bffe-97f577433c5b'
          }
        }
      )
    ];
    service.getAll().subscribe((learningOutcomes: LearningOutcome[]) => {
        expect(learningOutcomes.length).toBe(2);
        expect(learningOutcomes).toEqual(serviceExpectedReturnValue);
      }
    );

    const req = httpMock.expectOne(`${environment.coalbaseAPI + 'learningOutcomes'}`);
    expect(req.request.method).toBe('GET');
    req.flush(serverResponse);
  });
  it('Post Learning Outcome', () => {
    const serverResponse = {
      'competence': {
        'action': 'action1',
        'taxonomyLevel': 'ANALYSIS'
      },
      'tools': [
        {
          'value': 'tool1'
        }
      ],
      'purpose': {
        'value': 'purpose1'
      },
      '_links': {
        'self': {
          'href': 'http://localhost:8080/learningOutcomes/b37551ca-6e59-4c65-bffe-97f577433c5b'
        },
        'learningOutcome': {
          'href': 'http://localhost:8080/learningOutcomes/b37551ca-6e59-4c65-bffe-97f577433c5b'
        }
      }
    };

    const serviceExpectedReturnValue: LearningOutcome = new LearningOutcome(
      {action: 'action1', taxonomyLevel: 'ANALYSIS'},
      [{value: 'tool1'}],
      {value: 'purpose1'}
    );
    service.create(serviceExpectedReturnValue).subscribe((data: any) => {
      expect(data).toBe(serviceExpectedReturnValue);
    });
    const req = httpMock.expectOne(`${environment.coalbaseAPI + 'learningOutcomes'}`);
    expect(req.request.method).toBe('POST');
    req.flush(serverResponse);
  });


})
;
