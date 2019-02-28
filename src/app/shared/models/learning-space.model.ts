import {Resource} from "angular4-hal";
import {LearningOutcome} from "./learning-outcome.model";

export class LearningSpace extends Resource {


  private _title: string;
  private _requirement: LearningSpace | undefined;
  private _learningOutcome: LearningOutcome;

  constructor();
  constructor(name: string);
  constructor(name: string, learningOutcome: LearningOutcome);
  constructor(name: string, learningOutcome: LearningOutcome, requirement: LearningSpace);
  constructor(name?: string, learningOutcome?: LearningOutcome, requirement?: LearningSpace) {
    super();
    this._title = name || "";
    this._requirement = requirement || undefined;
    this._learningOutcome = learningOutcome || new LearningOutcome();

  }


  set title(value: string) {
    this._title = value;
  }

  set requirement(value: LearningSpace) {
    this._requirement = value;
  }

  set learningOutcome(value: LearningOutcome) {
    this._learningOutcome = value;
  }

  get title(): string {
    return this._title;
  }

  get requirement(): LearningSpace {
    return this._requirement as LearningSpace;
  }

  get learningOutcome(): LearningOutcome {
    return this._learningOutcome;
  }

  public isFirst(): boolean {
    return this._requirement == null;
  }

  public isRequirement(requirement: LearningSpace){
    return this._requirement === requirement;
  }

}
