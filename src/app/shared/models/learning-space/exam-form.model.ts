import {Schedule} from "../predefined-exam-form/schedule.model";
import {Duration} from "../predefined-exam-form/duration.model";

export class ExamForm {
  type: string = '';
  description: string = '';
  schedules: Schedule[] = [];
  duration: Duration = new Duration();
}
