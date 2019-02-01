import {Component, OnInit} from '@angular/core';
import {LearningOutcome} from '../../../shared/models/learning-outcome.model';
import {ActivatedRoute} from '@angular/router';
import {LearningOutcomeService} from '../../../core/services/learning-outcome/learning-outcome.service';

@Component({
  selector: 'app-learning-outcome-editor',
  templateUrl: './learning-outcome-editor.component.html',
  styleUrls: ['./learning-outcome-editor.component.scss']
})
export class LearningOutcomeEditorComponent implements OnInit {
  learningOutcome: LearningOutcome = {id: '', competence: {action: '', taxonomyLevel: ''}, tools: [], purpose: ''};

  constructor(private route: ActivatedRoute, private learningOutcomeService: LearningOutcomeService) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const identifier = params.get('learningOutcome');
      if (identifier) {
        this.learningOutcomeService.learningOutcome(identifier).subscribe(learningOutcome => this.learningOutcome = learningOutcome);
      } else {
        this.learningOutcomeService.firstLearningOutcome.subscribe(learningOutcome => this.learningOutcome = learningOutcome);
      }
    });
  }
}
