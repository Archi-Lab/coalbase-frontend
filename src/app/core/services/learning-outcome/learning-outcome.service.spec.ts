import {TestBed} from '@angular/core/testing';

import {LearningOutcomeService} from './learning-outcome.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ExternalConfigurationService} from '../external-configuration.service';
import {AngularHalModule} from 'angular4-hal';
import {environment} from '../../../../environments/environment';
import {LearningOutcome} from '../../../shared/models/learning-outcome/learning-outcome.model';

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
  it('Successful Get Learning Outcomes', () => {
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
                'href': 'http://api.coalbase.io/learningOutcomes/b37551ca-6e59-4c65-bffe-97f577433c5b'
              },
              'learningOutcome': {
                'href': 'http://api.coalbase.io/learningOutcomes/b37551ca-6e59-4c65-bffe-97f577433c5b'
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
                'href': 'http://api.coalbase.io/learningOutcomes/b37551ca-6e59-4c65-bffe-97f577433c5b'
              },
              'learningOutcome': {
                'href': 'http://api.coalbase.io/learningOutcomes/b37551ca-6e59-4c65-bffe-97f577433c5b'
              }
            }
          }
        ]
      },
      '_links': {
        'self': {
          'href': 'http://api.coalbase.io/learningOutcomes'
        },
        'profile': {
          'href': 'http://api.coalbase.io/profile/learningOutcomes'
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
            href: 'http://api.coalbase.io/learningOutcomes/b37551ca-6e59-4c65-bffe-97f577433c5b'
          },
          learningOutcome: {
            href: 'http://api.coalbase.io/learningOutcomes/b37551ca-6e59-4c65-bffe-97f577433c5b'
          }
        }
      ),
      new LearningOutcome(
        {action: 'action1', taxonomyLevel: 'ANALYSIS'},
        [{value: 'tool1'}],
        {value: 'purpose1'},
        {
          self: {
            href: 'http://api.coalbase.io/learningOutcomes/b37551ca-6e59-4c65-bffe-97f577433c5b'
          },
          learningOutcome: {
            href: 'http://api.coalbase.io/learningOutcomes/b37551ca-6e59-4c65-bffe-97f577433c5b'
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
  it('Successful Post Learning Outcome', () => {
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
          'href': 'http://api.coalbase.io/learningOutcomes/b37551ca-6e59-4c65-bffe-97f577433c5b'
        },
        'learningOutcome': {
          'href': 'http://api.coalbase.io/learningOutcomes/b37551ca-6e59-4c65-bffe-97f577433c5b'
        }
      }
    };
    const servicePostValue: LearningOutcome = new LearningOutcome(
      {action: 'action1', taxonomyLevel: 'ANALYSIS'},
      [{value: 'tool1'}],
      {value: 'purpose1'}
    );

    const serviceExpectedReturnValue: LearningOutcome = new LearningOutcome(
      {action: 'action1', taxonomyLevel: 'ANALYSIS'},
      [{value: 'tool1'}],
      {value: 'purpose1'}
    );
    service.create(servicePostValue).subscribe((response: LearningOutcome | any) => {
      // Compare all values as the base objects are not equal (response has links and root/proxy url)
      expect(response.purpose).toEqual(serviceExpectedReturnValue.purpose);
      expect(response.tools).toEqual(serviceExpectedReturnValue.tools);
      expect(response.competence).toEqual(serviceExpectedReturnValue.competence);
      // Look if the Links exists
      expect(response._links).toEqual({
          'self': {
            'href': 'http://api.coalbase.io/learningOutcomes/b37551ca-6e59-4c65-bffe-97f577433c5b'
          },
          'learningOutcome': {
            'href': 'http://api.coalbase.io/learningOutcomes/b37551ca-6e59-4c65-bffe-97f577433c5b'
          }
        }
      );
    });
    const req = httpMock.expectOne(`${environment.coalbaseAPI + 'learningOutcomes'}`);
    expect(req.request.method).toBe('POST');
    req.flush(serverResponse);
  });
  it('Successful Put Learning Outcome', () => {
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
          'href': 'http://api.coalbase.io/learningOutcomes/b37551ca-6e59-4c65-bffe-97f577433c5b'
        },
        'learningOutcome': {
          'href': 'http://api.coalbase.io/learningOutcomes/b37551ca-6e59-4c65-bffe-97f577433c5b'
        }
      }
    };
    const servicePutValue: LearningOutcome = new LearningOutcome(
      {action: 'action1', taxonomyLevel: 'ANALYSIS'},
      [{value: 'tool1'}],
      {value: 'purpose1'}
    );
    servicePutValue._links = {
      'self': {
        'href': 'http://api.coalbase.io/learningOutcomes/b37551ca-6e59-4c65-bffe-97f577433c5b'
      },
      'learningOutcome': {
        'href': 'http://api.coalbase.io/learningOutcomes/b37551ca-6e59-4c65-bffe-97f577433c5b'
      }
    };


    const serviceExpectedReturnValue: LearningOutcome = new LearningOutcome(
      {action: 'action1', taxonomyLevel: 'ANALYSIS'},
      [{value: 'tool1'}],
      {value: 'purpose1'}
    );
    serviceExpectedReturnValue._links = {
      'self': {
        'href': 'http://api.coalbase.io/learningOutcomes/b37551ca-6e59-4c65-bffe-97f577433c5b'
      },
      'learningOutcome': {
        'href': 'http://api.coalbase.io/learningOutcomes/b37551ca-6e59-4c65-bffe-97f577433c5b'
      }
    };
    serviceExpectedReturnValue.rootUrl = environment.coalbaseAPI;
    serviceExpectedReturnValue.proxyUrl = environment.coalbaseAPI;

    service.update(servicePutValue).subscribe((response: LearningOutcome | any) => {
      expect(response).toEqual(serviceExpectedReturnValue);
    });

    const req = httpMock.expectOne(`${environment.coalbaseAPI + 'learningOutcomes/b37551ca-6e59-4c65-bffe-97f577433c5b/'}`);
    expect(req.request.method).toBe('PUT');
    req.flush(serverResponse);
  });
  it('Successful Delete Learning Outcome', () => {
    const serviceDeleteValue: LearningOutcome = new LearningOutcome(
      {action: 'action1', taxonomyLevel: 'ANALYSIS'},
      [{value: 'tool1'}],
      {value: 'purpose1'}
    );
    serviceDeleteValue._links = {
      'self': {
        'href': 'http://api.coalbase.io/learningOutcomes/b37551ca-6e59-4c65-bffe-97f577433c5b'
      },
      'learningOutcome': {
        'href': 'http://api.coalbase.io/learningOutcomes/b37551ca-6e59-4c65-bffe-97f577433c5b'
      }
    };

    service.delete(serviceDeleteValue).subscribe((response: any) => {
      expect(response).toEqual('');
    });

    const req = httpMock.expectOne(`${environment.coalbaseAPI + 'learningOutcomes/b37551ca-6e59-4c65-bffe-97f577433c5b/'}`);
    expect(req.request.method).toBe('DELETE');
    req.flush('');
  });
})
;
