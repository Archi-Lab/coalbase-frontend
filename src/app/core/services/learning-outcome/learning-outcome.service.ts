import {Injectable, Injector} from '@angular/core';
import {RestService} from 'angular4-hal';
import {LearningOutcome} from '../../../shared/models/learning-outcome.model';
import {Observable, of} from "rxjs";

@Injectable()
export class LearningOutcomeService extends RestService<LearningOutcome> {
  constructor(injector: Injector) {
    super(LearningOutcome, 'learningOutcomes', injector);
  }

  public getFirstLearningOutcome(): Observable<LearningOutcome> {
    let firstLearningOutcome: LearningOutcome = new LearningOutcome();
    this.getAll().subscribe(firstLearningOutcomes => {
      firstLearningOutcome = firstLearningOutcomes[0];
    });
    return of(firstLearningOutcome);
  }
}
