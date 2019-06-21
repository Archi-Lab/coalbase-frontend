import {Resource} from "angular4-hal";
import {Schedule} from "./schedule.model";
import {Duration} from "./duration.model";

export class PredefinedExamForm extends Resource {
  type: string = '';
  description: string = '';
  schedules: Schedule[] = [];
  duration: Duration = new Duration();
}
