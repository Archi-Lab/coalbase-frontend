import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {LearningOutcomeService} from '../../../core/services/learning-outcome/learning-outcome.service';
import {LearningOutcome} from '../../../shared/models/learning-outcome.model';

@Component({
  selector: 'app-learning-outcome-editor',
  templateUrl: './learning-outcome-editor.component.html',
  styleUrls: ['./learning-outcome-editor.component.scss']
})
export class LearningOutcomeEditorComponent implements OnInit {
  // TODO remove example Learning Outcome
  learningOutcome: LearningOutcome = new LearningOutcome(
    {action: 'action1', taxonomyLevel: 'ANALYSIS'},
    [{value: 'tool1'}],
    {value: 'purpose1'},
    {
      self: {
        href: 'http://localhost:8080/learningOutcomes/b37551ca-6e59-4c65-bffe-97f577433c5b'
      },
      learningOutcome: {
        href: 'http://localhost:8080/learningOutcomes/b37551ca-6e59-4c65-bffe-97f577433c5b'
      }
    }
  );

  constructor(private route: ActivatedRoute, private learningOutcomeService: LearningOutcomeService) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const identifier = params.get('learningOutcomeIdentifier');
      if (identifier) {
        this.learningOutcomeService.get(identifier).subscribe(learingOutcome => this.learningOutcome = learingOutcome);
      } else {
        this.learningOutcomeService.getFirstLearningOutcome().subscribe(firstLearningOutcome => this.learningOutcome = firstLearningOutcome);
      }
    });
  }
}
