import {Resource} from "angular4-hal";
import {Schedule} from "./schedule.model";
import {Scope} from "./scope.model";

export class PredefinedExamForm extends Resource {
  type: string;
  description: string;
  schedules: Schedule[];
  scope: Scope;


  constructor();
  constructor(type: string, description: string, schedules: Schedule[], scope: Scope);
  constructor(type?: string, description?: string, schedules?: Schedule[], scope?: Scope) {
    super();
    this.type = type || '';
    this.description = description || '';
    this.schedules = schedules || [];
    this.scope = scope || new Scope();
  }
}
