import {Component, OnInit} from '@angular/core';
import {LearningSpace} from '../../../shared/models/learning-space.model';
import {LearningSpaceService} from '../../../core/services/learning-space/learning-space.service';
import {Router} from '@angular/router';
import {LearningOutcome} from '../../../shared/models/learning-outcome.model';

@Component({
  selector: 'app-learning-space-overview',
  templateUrl: './learning-space-overview.component.html',
  styleUrls: ['./learning-space-overview.component.scss']
})
export class LearningSpaceOverviewComponent implements OnInit {
  sortedLearningSpaces: LearningSpace[] = [];

  constructor(private learningSpaceService: LearningSpaceService, private router: Router) {
  }

  ngOnInit() {
    this.learningSpaceService.learningSpaces.subscribe(learningSpaces => {
        learningSpaces.forEach(learningSpace => {
          learningSpace.getRelation(LearningOutcome, 'learningOutcome').subscribe(
            (learningOutcome: LearningOutcome) => learningSpace.learningOutcome = learningOutcome
          );
          learningSpace.getRelation(LearningSpace, 'requirement').subscribe(
            (requirement: LearningSpace) => {
              learningSpace.requirement = requirement;
              this.sortedLearningSpaces.push(learningSpace);
            },
            (error) => {
              if (this.sortedLearningSpaces.length > 0 && this.sortedLearningSpaces[0].isFirst()) {
                console.log('There is more than one learningSpace without requirement, ' +
                  'this can happen if the backend reponds with an error');
              } else {
                this.sortedLearningSpaces.unshift(learningSpace);
              }
            }
          );
        });
      }
    );
  }
}
