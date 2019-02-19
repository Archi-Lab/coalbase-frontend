import {Component} from '@angular/core';
import {LearningOutcome} from '../../../shared/models/learning-outcome.model';
import {Router} from '@angular/router';
import {LearningOutcomeService} from '../../../core/services/learning-outcome/learning-outcome.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'applearningoutcomeview',
  templateUrl: './learning-outcome.page.html',
  styleUrls: ['./learning-outcome.page.scss']
})
export class LearningOutcomePage {
  learningOutcomes: Observable<LearningOutcome[]>;

  constructor(private learningOutcomeService: LearningOutcomeService, private router: Router) {
    this.learningOutcomes = this.learningOutcomeService.getAll();
  }

}
