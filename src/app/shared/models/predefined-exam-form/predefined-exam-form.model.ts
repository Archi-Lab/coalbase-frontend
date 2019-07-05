import {Resource} from "angular4-hal";
import {Schedule} from "./schedule.model";
import {Scope} from "./scope.model";

export class PredefinedExamForm extends Resource {
  type: string = '';
  description: string = '';
  schedules: Schedule[] = [];
  scope: Scope = new Scope();
}
