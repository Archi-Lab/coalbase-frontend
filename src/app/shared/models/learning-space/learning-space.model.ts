import {Resource} from 'angular4-hal';
import {LearningOutcome} from '../learning-outcome/learning-outcome.model';

export class LearningSpace extends Resource {


  private _title: string;
  private _requirement?: LearningSpace;
  private _learningOutcome: LearningOutcome;

  constructor();
  constructor(title: string);
  constructor(title: string, learningOutcome: LearningOutcome);
  constructor(title: string, learningOutcome: LearningOutcome, requirement: LearningSpace);
  constructor(title?: string, learningOutcome?: LearningOutcome, requirement?: LearningSpace) {
    super();
    this._title = title || '';
    this._requirement = requirement || undefined;
    this._learningOutcome = learningOutcome || new LearningOutcome();

  }

  public isFirst(): boolean {
    return this._requirement == null;
  }

  public isRequirement(requirement: LearningSpace) {
    return this._requirement === requirement;
  }


  public getIdFromUri(): string {
    if (this._links != null && this._links.hasOwnProperty('self')) {
      const selfUri: string = this._links.self.href;
      return selfUri.substring(selfUri.lastIndexOf('/') + 1, selfUri.length).trim();
    } else {
      return '';
    }
  }

  set title(value: string) {
    this._title = value;
  }

  set requirement(value: LearningSpace | undefined) {
    this._requirement = value;
  }

  set learningOutcome(value: LearningOutcome) {
    this._learningOutcome = value;
  }

  get title(): string {
    return this._title;
  }

  get requirement(): LearningSpace | undefined {
    return this._requirement as LearningSpace;
  }

  get learningOutcome(): LearningOutcome {
    return this._learningOutcome;
  }
}
