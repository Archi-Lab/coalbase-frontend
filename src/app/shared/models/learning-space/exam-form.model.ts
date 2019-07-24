import {Schedule} from "../predefined-exam-form/schedule.model";
import {Scope} from "../predefined-exam-form/scope.model";

export class ExamForm {
  type: string;
  description: string;
  schedules: Schedule[];
  scope: Scope;


  constructor();
  constructor(type: string, description: string, schedules: Schedule[], scope: Scope);
  constructor(type?: string, description?: string, schedules?: Schedule[], scope?: Scope) {
    this.type = type || '';
    this.description = description || '';
    this.schedules = schedules || [];
    this.scope = scope || new Scope();
  }
}
