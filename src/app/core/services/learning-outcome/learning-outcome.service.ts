import {Injectable, Injector} from '@angular/core';
import {RestService} from 'angular4-hal';
import {LearningOutcome} from '../../../shared/models/learning-outcome.model';

@Injectable()
export class LearningOutcomeService extends RestService<LearningOutcome> {
  constructor(injector: Injector) {
    super(LearningOutcome, 'learningOutcomes', injector);
  }
}
