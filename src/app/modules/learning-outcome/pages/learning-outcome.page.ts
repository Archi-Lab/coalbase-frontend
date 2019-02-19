import {Component, OnInit} from '@angular/core';
import {LearningOutcome} from '../../../shared/models/learning-outcome.model';
import {Router} from '@angular/router';
import {LearningOutcomeService} from '../../../core/services/learning-outcome/learning-outcome.service';

@Component({
  selector: 'applearningoutcomeview',
  templateUrl: './learning-outcome.page.html',
  styleUrls: ['./learning-outcome.page.scss']
})
export class LearningOutcomePage implements OnInit {
  learningOutcomes: LearningOutcome[] = [];

  constructor(private learningOutcomeService: LearningOutcomeService, private router: Router) {
  }

  ngOnInit(): void {
    this.learningOutcomeService.getAll().subscribe((learningOutcomes: LearningOutcome[]) => {
        this.learningOutcomes = learningOutcomes;
      }
    );
  }
}
