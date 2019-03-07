import {Component, OnInit} from '@angular/core';
import {LearningSpace} from '../../../shared/models/learning-space.model';
import {LearningSpaceService} from '../../../core/services/learning-space/learning-space.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-learning-space-overview',
  templateUrl: './learning-space-overview.component.html',
  styleUrls: ['./learning-space-overview.component.scss']
})
export class LearningSpaceOverviewComponent implements OnInit {
  /*
  space1 = new LearningSpace('space1');
  space2 = new LearningSpace('space2', new LearningOutcome({
    action: 'action1',
    taxonomyLevel: 'LEVEL1'
  }, [{value: 'tool1'}, {value: 'tool2'}], {value: 'purpose1'}), this.space1);
  space3 = new LearningSpace('space3', new LearningOutcome({
    action: 'action1',
    taxonomyLevel: 'LEVEL1'
  }, [{value: 'tool1'}, {value: 'tool2'}], {value: 'purpose1'}), this.space2);
  space4 = new LearningSpace('space4', new LearningOutcome({
    action: 'action1',
    taxonomyLevel: 'LEVEL1'
  }, [{value: 'tool1'}, {value: 'tool2'}], {value: 'purpose1'}), this.space3);
  space5 = new LearningSpace('space5', new LearningOutcome({
    action: 'action1',
    taxonomyLevel: 'LEVEL1'
  }, [{value: 'tool1'}, {value: 'tool2'}], {value: 'purpose1'}), this.space4);
  space6 = new LearningSpace('space6', new LearningOutcome({
    action: 'action1',
    taxonomyLevel: 'LEVEL1'
  }, [{value: 'tool1'}, {value: 'tool2'}], {value: 'purpose1'}), this.space5);

  sampleLearningSpaces: LearningSpace[] = [
    this.space2, this.space3, this.space6, this.space1, this.space4, this.space5
  ];
*/
  sortedLearningSpaces: LearningSpace[] = [];

  constructor(private learningSpaceService: LearningSpaceService, private router: Router) {
  }

  ngOnInit() {


    this.learningSpaceService.learningSpaces.subscribe(learningSpaces => {
        learningSpaces.forEach(learningSpace => {
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
