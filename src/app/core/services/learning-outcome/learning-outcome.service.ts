import {Injectable, Injector} from '@angular/core';
import {LearningOutcome} from '../../../shared/models/learning-outcome/learning-outcome.model';
import {ListResourceService} from '../ListResourceService';

@Injectable({
  providedIn: 'root'
})
export class LearningOutcomeService extends ListResourceService<LearningOutcome> {

  constructor(injector: Injector) {
    super(LearningOutcome, 'learningOutcomes', injector);
    this.fetchListResource();
  }

}
