import {Component, OnInit} from '@angular/core';
import {LearningOutcome} from '../../../shared/models/learning-outcome.model';
import {Router} from '@angular/router';
import {LearningOutcomeService} from '../../../core/services/learning-outcome/learning-outcome.service';

@Component({
  selector: 'app-learning-outcome-view',
  templateUrl: './learning-outcome.page.html',
  styleUrls: ['./learning-outcome.page.scss']
})
export class LearningOutcomePage implements OnInit {
  learningOutcomes: LearningOutcome[] = [new LearningOutcome(
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
  ),
    new LearningOutcome(
      {action: 'action2', taxonomyLevel: 'ANALYSIS'},
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
    ),];

  constructor(private learningOutcomeService: LearningOutcomeService, private router: Router) {
  }

  ngOnInit(): void {
    this.learningOutcomeService.getAll().subscribe((learningOutcomes: LearningOutcome[]) => {
        this.learningOutcomes = learningOutcomes;
      }
    );
  }

  public getIdFromURI(learningOutcome: LearningOutcome): string {
    const selfUri: string = learningOutcome._links.self.href;
    return selfUri.substring(selfUri.lastIndexOf("/") + 1, selfUri.length).trim();
  }

}
