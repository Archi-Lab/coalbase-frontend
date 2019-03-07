import {Injectable, Injector} from '@angular/core';
import {RestService} from 'angular4-hal';
import {BehaviorSubject, from, Observable} from 'rxjs';
import {LearningSpace} from '../../../shared/models/learning-space.model';
import {reject} from 'q';

@Injectable()
export class LearningSpaceService extends RestService<LearningSpace> {

  private _LearningSpaces: BehaviorSubject<LearningSpace[]> = new BehaviorSubject<LearningSpace[]>([]);

  constructor(injector: Injector) {
    super(LearningSpace, 'learningSpaces', injector);
    this.fetchLearningSpaces();
  }

  public getFirstLearningSpace(): Observable<LearningSpace> {
    return from(new Promise(resolve => {
      this.getAll().subscribe(value => {
        resolve(value[0]);
      }, error => reject(error));
    }));
  }

  delete(entity: LearningSpace): Observable<Object> {
    this.deleteLearningSpaceFromState(entity);
    return super.delete(entity);
  }

  create(entity: LearningSpace): Observable<Observable<never> | LearningSpace> {
    return from(new Promise(resolve => {
      super.create(entity).subscribe(learningSpace => {
        this.createLearningSpaceInState(learningSpace as LearningSpace);
        resolve(learningSpace);
      });
    }));
  }

  update(entity: LearningSpace): Observable<Observable<never> | LearningSpace> {
    this.updateLearningSpaceInState(entity);
    return super.update(entity);
  }

  patch(entity: LearningSpace): Observable<Observable<never> | LearningSpace> {
    this.updateLearningSpaceInState(entity);
    return super.patch(entity);
  }

  public get learningSpaces(): Observable<LearningSpace[]> {
    return this._LearningSpaces.asObservable();
  }

  private fetchLearningSpaces(): void {
    super.getAll().subscribe(LearningSpaces => {
      this._LearningSpaces.next(LearningSpaces);
    });
  }

  private deleteLearningSpaceFromState(learningSpace: LearningSpace): void {
    let state: LearningSpace[] = this._LearningSpaces.value;
    state = state.filter(stateLearningSpace => stateLearningSpace.getIdFromUri() !== learningSpace.getIdFromUri());
    this._LearningSpaces.next(state);
  }

  private updateLearningSpaceInState(learningSpace: LearningSpace): void {
    const state: LearningSpace[] = this._LearningSpaces.value;
    state.forEach((stateLearningSpace, index) => {
      if (stateLearningSpace.getIdFromUri() === learningSpace.getIdFromUri()) {
        state[index] = learningSpace;
      }
    });
    this._LearningSpaces.next(state);
  }

  private createLearningSpaceInState(learningSpace: LearningSpace): void {
    const state: LearningSpace[] = this._LearningSpaces.value;
    state.push(learningSpace);
    this._LearningSpaces.next(state);
  }

}
