import {Resource} from 'angular4-hal';
import {LearningSpace} from '../learning-space/learning-space.model';

export class Course extends Resource {
  private _title: string;
  private _description: string;
  private _learningSpaces: LearningSpace[];

  constructor();
  constructor(title: string);
  constructor(title: string, learningSpaces: LearningSpace[]);
  constructor(title: string, learningSpaces: LearningSpace[], description: string);
  constructor(title?: string, learningSpaces?: LearningSpace[], description?: string) {
    super();
    this._title = title || '';
    this._learningSpaces = learningSpaces || [];
    this._description = description || '';
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get learningSpaces(): LearningSpace[] {
    return this._learningSpaces;
  }

  set learningSpaces(value: LearningSpace[]) {
    this._learningSpaces = value;
  }
}
