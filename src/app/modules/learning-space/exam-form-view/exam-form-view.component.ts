import {Component, Input, OnInit} from '@angular/core';
import {ExamForm} from "../../../shared/models/learning-space/exam-form.model";

@Component({
  selector: 'app-exam-form-view',
  templateUrl: './exam-form-view.component.html',
  styleUrls: ['./exam-form-view.component.scss']
})
export class ExamFormViewComponent implements OnInit {

  @Input() examForm: ExamForm | undefined = undefined;

  constructor() { }

  ngOnInit() {
  }

}
