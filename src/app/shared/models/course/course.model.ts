import {Resource} from 'angular4-hal';
import {LearningSpace} from '../learning-space/learning-space.model';

export class Course extends Resource {
  private _shortTitle: string;
  private _title: string;
  private _description: string;
  private _learningSpaces: LearningSpace[];

  constructor();
  constructor(shortTitle: string, title: string);
  constructor(shortTitle: string, title: string, learningSpaces: LearningSpace[]);
  constructor(shortTitle: string, title: string, learningSpaces: LearningSpace[], description: string);
  constructor(shortTitle?: string, title?: string, learningSpaces?: LearningSpace[], description?: string) {
    super();
    this._shortTitle = shortTitle || '';
    this._title = title || '';
    this._learningSpaces = learningSpaces || [];
    this._description = description || '';
  }

  public getIdFromUri(): string {
    if (this._links != null && this._links.hasOwnProperty('self')) {
      const selfUri: string = this._links.self.href;
      return selfUri.substring(selfUri.lastIndexOf('/') + 1, selfUri.length).trim();
    } else {
      return '';
    }
  }

  get shortTitle(): string {
    return this._shortTitle;
  }

  set shortTitle(value: string) {
    this._shortTitle = value;
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
