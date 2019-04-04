import {Component, OnInit} from '@angular/core';
import {LearningSpace} from '../../../shared/models/learning-space/learning-space.model';
import {LearningSpaceService} from '../../../core/services/learning-space/learning-space.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LearningOutcome} from '../../../shared/models/learning-outcome/learning-outcome.model';
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {CourseService} from "../../../core/services/course/course.service";

@Component({
  selector: 'app-learning-space-overview',
  templateUrl: './learning-space-overview.component.html',
  styleUrls: ['./learning-space-overview.component.scss']
})
export class LearningSpaceOverviewComponent implements OnInit {
  sortedLearningSpaces: LearningSpace[] = [];
  courseIdentifier: string = "";

  constructor(private readonly learningSpaceService: LearningSpaceService,
              private readonly courseService: CourseService,
              private readonly router: Router,
              private readonly route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.courseIdentifier = params.get('courseIdentifier') as string;
    });

    this.route.url.subscribe(urlSegment => {
      console.log("Path: " + JSON.stringify(urlSegment));
      if (this.courseIdentifier !== "") {
        console.log("called");
        this.resolveLearningSpaces(this.courseIdentifier);
      }
    });

  }

  private resolveLearningSpaces(courseIdentifier: string): void {
    this.courseService.get(courseIdentifier).subscribe(course => {
      course.getRelationArray(LearningSpace, "learningSpaces").subscribe(learningSpaces => {
        learningSpaces.forEach(learningSpace => {
          this.resolveLearningOutcomeOf(learningSpace);
          this.resolveRequirementOf(learningSpace);
        });
      });
    });
  }

  private resolveLearningOutcomeOf(aLearningSpace: LearningSpace): void {
    aLearningSpace.getRelation(LearningOutcome, 'learningOutcome').subscribe(
      (learningOutcome: LearningOutcome) => aLearningSpace.learningOutcome = learningOutcome
    );
  }

  private resolveRequirementOf(aLearningSpace: LearningSpace): void {
    aLearningSpace.getRelation(LearningSpace, 'requirement').subscribe(
      (requirement: LearningSpace) => {
        aLearningSpace.requirement = requirement;
        this.sortedLearningSpaces.push(aLearningSpace);
        this.sortedLearningSpaces.sort((lowerElement, higherElement): number => {


          if (!lowerElement.isFirst() && lowerElement.isRequirement(higherElement)) {
            return 1;
          }
          if (!higherElement.isFirst() && higherElement.isRequirement(lowerElement)) {
            return -1;
          }
          return 0;
        });
      },
      (error) => {
        if (this.sortedLearningSpaces.length > 0 && this.sortedLearningSpaces[0].isFirst()) {
          console.log('There is more than one learningSpace without requirement, ' +
            'this can happen if the backend reponds with an error');
          this.sortedLearningSpaces.push(aLearningSpace);
        } else {
          this.sortedLearningSpaces.unshift(aLearningSpace);
        }
      }
    );
  }

  drop(event: CdkDragDrop<LearningSpace[]>): void {
    moveItemInArray(this.sortedLearningSpaces, event.previousIndex, event.currentIndex);
    this.updateRelationForLearningSpace(event.currentIndex);
    this.updateRelationForLearningSpace(event.previousIndex);
    if (this.sortedLearningSpaces.length > (event.previousIndex + 1)) {
      this.updateRelationForLearningSpace((event.previousIndex + 1));
    }
  }

  private updateRelationForLearningSpace(indexToUpdate: number): void {
    if (indexToUpdate === 0) {
      this.sortedLearningSpaces[indexToUpdate].deleteRelation('requirement', this.sortedLearningSpaces[indexToUpdate].requirement as LearningSpace).subscribe();
      this.sortedLearningSpaces[indexToUpdate].requirement = undefined;
    } else {
      this.sortedLearningSpaces[indexToUpdate].requirement = this.sortedLearningSpaces[indexToUpdate - 1];
      this.sortedLearningSpaces[indexToUpdate].updateRelation('requirement', this.sortedLearningSpaces[indexToUpdate].requirement as LearningSpace).subscribe();
    }
  }

}
