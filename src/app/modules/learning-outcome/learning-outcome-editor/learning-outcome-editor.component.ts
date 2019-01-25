import {Component, OnInit} from '@angular/core';
import {LearningOutcome} from '../../../shared/models/learning-outcome.model';
import {ActivatedRoute} from '@angular/router';
import {LearningOutcomeService} from '../../../core/services/learning-outcome.service';

@Component({
  selector: 'app-learning-outcome-editor',
  templateUrl: './learning-outcome-editor.component.html',
  styleUrls: ['./learning-outcome-editor.component.scss']
})
export class LearningOutcomeEditorComponent implements OnInit {
  learningOutcome: LearningOutcome = {id: 0, title: '', skill: {description: '', taxonomyLevel: 0}, toolKit: [], purpose: ''};

  constructor(private route: ActivatedRoute, private learningOutcomeService: LearningOutcomeService) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['learningOutcome']) {
        this.learningOutcome = this.learningOutcomeService.learningOutcome(params['learningOutcome']);
      } else {
        this.learningOutcome = this.learningOutcomeService.firstlearningOutcome;
      }
    });
  }
}
