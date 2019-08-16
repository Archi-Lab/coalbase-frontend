import {Resource} from 'angular4-hal';
import {LearningOutcome} from '../learning-outcome/learning-outcome.model';
import {ExamForm} from "./exam-form.model";

export class LearningSpace extends Resource {

  private _title: string;
  private _examForm: ExamForm;
  private _requirement?: LearningSpace;
  private _learningOutcome?: LearningOutcome;

  constructor();
  constructor(title: string);
  constructor(title: string, examForm: ExamForm, learningOutcome: LearningOutcome);
  constructor(title: string, examForm: ExamForm, learningOutcome: LearningOutcome, requirement: LearningSpace);
  constructor(title?: string, examForm?: ExamForm, learningOutcome?: LearningOutcome, requirement?: LearningSpace) {
    super();
    this._title = title || '';
    this._examForm = examForm || new ExamForm();
    this._requirement = requirement || undefined;
    this._learningOutcome = learningOutcome || undefined;

  }

  public isFirst(): boolean {
    return this._requirement == null;
  }

  public isRequirement(requirement: LearningSpace) {
    if (this._requirement) {
      return this._requirement.getIdFromUri() === requirement.getIdFromUri();
    }
    return false;
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

  set examForm(value: ExamForm) {
    this._examForm = value;
  }

  set requirement(value: LearningSpace | undefined) {
    this._requirement = value;
  }

  set learningOutcome(value: LearningOutcome | undefined) {
    this._learningOutcome = value;
  }

  get title(): string {
    return this._title;
  }

  get examForm(): ExamForm {
    return this._examForm;
  }

  get requirement(): LearningSpace | undefined {
    return this._requirement as LearningSpace;
  }

  get learningOutcome(): LearningOutcome | undefined {
    return this._learningOutcome;
  }
}
