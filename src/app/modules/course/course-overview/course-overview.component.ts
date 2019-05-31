import {Component} from '@angular/core';
import {Course} from '../../../shared/models/course/course.model';
import {Observable} from 'rxjs';
import {CourseService} from '../../../core/services/course/course.service';
import {LearningSpace} from "../../../shared/models/learning-space/learning-space.model";

@Component({
  selector: 'appcourseview',
  templateUrl: './course-overview.component.html',
  styleUrls: ['./course-overview.component.scss']
})
export class CourseOverviewComponent {
  courses: Observable<Course[]>;

  constructor(private readonly courseService: CourseService) {
    this.courses = this.courseService.listResource;
  }

  ngOnInit() {
    this.courses.subscribe(
      courses => {
        for (const course of courses) {
          this.resolveLearningSpaces(course);
        }
      }
    );
  }

  private resolveLearningSpaces(course: Course): void {
    course.learningSpaces = [];
    course.getRelationArray(LearningSpace, "learningSpaces").subscribe(learningSpaces => {
      learningSpaces.forEach(learningSpace => {
        this.resolveRequirementOfLearningSpace(course, learningSpace);
      });
    });
  }

  private resolveRequirementOfLearningSpace(aCourse: Course, aLearningSpace: LearningSpace): void {
    aLearningSpace.getRelation(LearningSpace, 'requirement').subscribe(
      (requirement: LearningSpace) => {
        aLearningSpace.requirement = requirement;
        aCourse.learningSpaces.push(aLearningSpace);
        aCourse.learningSpaces.sort((lowerElement, higherElement): number => {
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
        if (aCourse.learningSpaces.length > 0 && aCourse.learningSpaces[0].isFirst()) {
          console.log('There is more than one learningSpace without requirement, ' +
            'this can happen if the backend reponds with an error');
          aCourse.learningSpaces.push(aLearningSpace);
        } else {
          aCourse.learningSpaces.unshift(aLearningSpace);
        }
      }
    );
  }
}
