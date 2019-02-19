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
    this.deleteLearningOutcomeFromState(entity);
    return super.delete(entity);
  }

  create(entity: LearningOutcome): Observable<Observable<never> | LearningOutcome> {
    return from(new Promise(resolve => {
      super.create(entity).subscribe(learningOutcome => {
        this.createLearningOutcomeInState(learningOutcome as LearningOutcome);
        resolve(learningOutcome);
      });
    }));
  }

  update(entity: LearningOutcome): Observable<Observable<never> | LearningOutcome> {
    this.updateLearningOutcomeInState(entity);
    return super.update(entity);
  }

  patch(entity: LearningOutcome): Observable<Observable<never> | LearningOutcome> {
    this.updateLearningOutcomeInState(entity);
    return super.patch(entity);
  }

  public get learningOutcomes(): Observable<LearningOutcome[]> {
    return this._learningOutcomes.asObservable();
  }

  private fetchLearningOutcomes(): void {
    super.getAll().subscribe(learningOutcomes => {
      this._learningOutcomes.next(learningOutcomes);
    });
  }

  private deleteLearningOutcomeFromState(learningOutcome: LearningOutcome): void {
    let state: LearningOutcome[] = this._learningOutcomes.value;
    state = state.filter(stateLearningOutcome => stateLearningOutcome.getIdFromUri() !== learningOutcome.getIdFromUri());
    this._learningOutcomes.next(state);
  }

  private updateLearningOutcomeInState(learningOutcome: LearningOutcome): void {
    const state: LearningOutcome[] = this._learningOutcomes.value;
    state.forEach((stateLearningOutcome, index) => {
      if (stateLearningOutcome.getIdFromUri() === learningOutcome.getIdFromUri()) {
        state[index] = learningOutcome;
      }
    });
    this._learningOutcomes.next(state);
  }

  private createLearningOutcomeInState(learningOutcome: LearningOutcome): void {
    const state: LearningOutcome[] = this._learningOutcomes.value;
    state.push(learningOutcome);
    this._learningOutcomes.next(state);
  }

}
