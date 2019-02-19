import {Injectable, Injector} from '@angular/core';
import {RestService} from 'angular4-hal';
import {LearningOutcome} from '../../../shared/models/learning-outcome.model';
import {BehaviorSubject, from, Observable} from "rxjs";
import {reject} from "q";

@Injectable()
export class LearningOutcomeService extends RestService<LearningOutcome> {

  private _learningOutcomes: BehaviorSubject<LearningOutcome[]> = new BehaviorSubject<LearningOutcome[]>([]);

  constructor(injector: Injector) {
    super(LearningOutcome, 'learningOutcomes', injector);
    this.fetchLearningOutcomes();
  }

  public getFirstLearningOutcome(): Observable<LearningOutcome> {
    return from(new Promise(resolve => {
      this.getAll().subscribe(value => {
        resolve(value[0]);
      }, error => reject(error));
    }));
  }

  delete(entity: LearningOutcome): Observable<Object> {
    const result = super.delete(entity);
    this.fetchLearningOutcomes();
    return result;
  }

  create(entity: LearningOutcome): Observable<Observable<never> | LearningOutcome> {
    const result = super.create(entity);
    this.fetchLearningOutcomes();
    return result;
  }

  update(entity: LearningOutcome): Observable<Observable<never> | LearningOutcome> {
    const result = super.update(entity);
    this.fetchLearningOutcomes();
    return result;
  }

  patch(entity: LearningOutcome): Observable<Observable<never> | LearningOutcome> {
    const result = super.patch(entity);
    this.fetchLearningOutcomes();
    return result;
  }

  public get learningOutcomes(): Observable<LearningOutcome[]> {
    return this._learningOutcomes.asObservable();
  }

  private fetchLearningOutcomes() {
    super.getAll().subscribe(learningOutcomes => {
      const oldState: LearningOutcome[] = this._learningOutcomes.value;
      const newState: LearningOutcome[] = [];

      learningOutcomes.forEach(learningOutcome => {
        const condition = oldState.filter(oldLearningOutcome => oldLearningOutcome.getIdFromUri() === learningOutcome.getIdFromUri());
        if (condition == null || condition === []) {
          newState.push(learningOutcome);
        }
      });
      this._learningOutcomes.next(oldState.concat(newState));
    });
  }

}
