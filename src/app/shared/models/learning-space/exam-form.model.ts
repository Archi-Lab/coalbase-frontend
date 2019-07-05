import {Schedule} from "../predefined-exam-form/schedule.model";
import {Scope} from "../predefined-exam-form/scope.model";

export class ExamForm {
  type: string = '';
  description: string = '';
  schedules: Schedule[] = [];
  scope: Scope = new Scope();
}
