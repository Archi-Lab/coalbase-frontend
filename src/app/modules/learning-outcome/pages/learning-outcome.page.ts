import {Component, OnInit} from '@angular/core';
import {LearningOutcome} from '../../../shared/models/learning-outcome.model';
import {Router} from '@angular/router';
import {LearningOutcomeService} from '../../../core/services/learning-outcome/learning-outcome.service';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-learning-outcome-view',
  templateUrl: './learning-outcome.page.html',
  styleUrls: ['./learning-outcome.page.scss']
})
export class LearningOutcomePage implements OnInit {
  learningOutcomes: LearningOutcome[] = [];

  constructor(private learningOutcomeService: LearningOutcomeService, private router: Router) {
  }

  ngOnInit(): void {
    console.log(environment.coalbaseAPI);
    this.learningOutcomeService.getAll().subscribe((learningOutcomes: LearningOutcome[]) => {
        console.log(JSON.stringify(learningOutcomes));
      }
    );
  }
}
