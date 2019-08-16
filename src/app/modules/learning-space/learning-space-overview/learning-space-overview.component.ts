import {Component, Input, OnInit} from '@angular/core';
import {LearningSpace} from "../../../shared/models/learning-space/learning-space.model";
import {ExamForm} from "../../../shared/models/learning-space/exam-form.model";

@Component({
  selector: 'app-learning-space-overview',
  templateUrl: './learning-space-overview.component.html',
  styleUrls: ['./learning-space-overview.component.scss']
})
export class LearningSpaceOverviewComponent implements OnInit {

  @Input() learningSpace: LearningSpace = new LearningSpace();

  constructor() { }

  ngOnInit() {
  }

  public isExamFormEmpty(examForm: ExamForm): boolean {
    return examForm.type === '' && examForm.description === '' && examForm.scope.minValue === 0 && examForm.scope.maxValue === 0 && examForm.scope.unit === '' && examForm.schedules.length === 0;
  }

}
