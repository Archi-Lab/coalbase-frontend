import {Component, OnInit} from '@angular/core';
import {LearningSpace} from '../../../shared/models/learning-space/learning-space.model';
import {LearningSpaceService} from '../../../core/services/learning-space/learning-space.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LearningOutcome} from '../../../shared/models/learning-outcome/learning-outcome.model';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {CourseService} from "../../../core/services/course/course.service";
import {Course} from "../../../shared/models/course/course.model";
import {ExamForm} from "../../../shared/models/learning-space/exam-form.model";

@Component({
  selector: 'app-learning-space-list-overview',
  templateUrl: './learning-space-list-overview.component.html',
  styleUrls: ['./learning-space-list-overview.component.scss']
})
export class LearningSpaceListOverviewComponent implements OnInit {

  sortedLearningSpaces: LearningSpace[] = [];
  unsortedLearningSpaces: LearningSpace[] = [];
  course: Course = new Course();
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
      if (this.courseIdentifier !== "") {
        this.resolveCourse(this.courseIdentifier);
        this.resolveLearningSpaces(this.courseIdentifier);
      }
    });
  }

  private resolveCourse(courseIdentifier: string): void {
    this.courseService.get(courseIdentifier).subscribe(course => {
      this.course = course;
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
        this.checkUnusedLearningSpaces();
        this.sortedLearningSpaces.push(aLearningSpace);
        this.sortedLearningSpaces.sort((a, b) => LearningSpaceListOverviewComponent.sortLearningSpaces(a, b));
      },
      (error) => {
        if (this.sortedLearningSpaces.length > 0 && this.sortedLearningSpaces[0].isFirst()) {
          this.unsortedLearningSpaces.push(aLearningSpace);
        } else {
          this.unsortedLearningSpaces.push(aLearningSpace);
        }
      }
    );
  }

  private checkUnusedLearningSpaces(): void {
    this.sortedLearningSpaces.forEach((learningSpaceToCheck) => {
      if (learningSpaceToCheck.requirement !== undefined) {
        const requirementToCheck : LearningSpace = learningSpaceToCheck.requirement;
        if (!this.sortedLearningSpaces.find(learningSpace => learningSpace.getIdFromUri() === requirementToCheck.getIdFromUri())) {
          const requirementIndex = this.unsortedLearningSpaces.findIndex(learningSpace => learningSpace.getIdFromUri() === requirementToCheck.getIdFromUri());
          if (requirementIndex >= 0) {
            this.sortedLearningSpaces.unshift(this.unsortedLearningSpaces[requirementIndex]);
            this.unsortedLearningSpaces.splice(requirementIndex, 1);
          }
        }
      }
    });
  }

  private static sortLearningSpaces(lowerElement: LearningSpace, higherElement: LearningSpace): number {
    if (!lowerElement.isFirst() && lowerElement.isRequirement(higherElement)) {
      return 1;
    }
    if (!higherElement.isFirst() && higherElement.isRequirement(lowerElement)) {
      return -1;
    }
    return 0;
  }

  drop(event: CdkDragDrop<LearningSpace[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(this.sortedLearningSpaces, event.previousIndex, event.currentIndex);
      this.updateRelationForLearningSpace(event.currentIndex);
      this.updateRelationForLearningSpace(event.previousIndex);
      if (this.sortedLearningSpaces.length > (event.previousIndex + 1)) {
        this.updateRelationForLearningSpace((event.previousIndex + 1));
      }
    } else {
      transferArrayItem(this.unsortedLearningSpaces,
        this.sortedLearningSpaces,
        event.previousIndex,
        event.currentIndex);
      this.updateRelationForLearningSpace(event.currentIndex);
      this.updateRelationForLearningSpace(event.currentIndex + 1);
    }

  }

  transfer(event: CdkDragDrop<LearningSpace[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }
  }

  public isExamFormEmpty(examForm: ExamForm): boolean {
    return examForm.type === '' && examForm.description === '' && examForm.scope.minValue === 0 && examForm.scope.maxValue === 0 && examForm.scope.unit === '' && examForm.schedules.length === 0;
  }

  private updateRelationForLearningSpace(indexToUpdate: number): void {
    if (indexToUpdate === 0) {
      if (this.sortedLearningSpaces[indexToUpdate].requirement) {
        this.sortedLearningSpaces[indexToUpdate].deleteRelation('requirement', this.sortedLearningSpaces[indexToUpdate].requirement as LearningSpace).subscribe();
        this.sortedLearningSpaces[indexToUpdate].requirement = undefined;
      }
    } else {
      this.sortedLearningSpaces[indexToUpdate].requirement = this.sortedLearningSpaces[indexToUpdate - 1];
      if (this.sortedLearningSpaces[indexToUpdate].requirement) {
        this.sortedLearningSpaces[indexToUpdate].addRelation('requirement', this.sortedLearningSpaces[indexToUpdate].requirement as LearningSpace).subscribe();
      } else {
        this.sortedLearningSpaces[indexToUpdate].updateRelation('requirement', this.sortedLearningSpaces[indexToUpdate].requirement as LearningSpace).subscribe();
      }
    }
  }
}
