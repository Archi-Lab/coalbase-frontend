import {Injectable, Injector} from '@angular/core';
import {RestService} from 'angular4-hal';
import {LearningOutcome} from '../../../shared/models/learning-outcome.model';
import {from, Observable} from "rxjs";
import {reject} from "q";

@Injectable()
export class LearningOutcomeService extends RestService<LearningOutcome> {
  constructor(injector: Injector) {
    super(LearningOutcome, 'learningOutcomes', injector);
  }

  public getFirstLearningOutcome(): Observable<LearningOutcome> {
    return from(new Promise(resolve => {
      this.getAll().subscribe(value => {
        resolve(value[0]);
      }, error => reject(error));
    }));
  }
}
