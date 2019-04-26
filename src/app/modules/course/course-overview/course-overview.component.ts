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

  public buildShortName(course: Course): string {
    return course.title.substr(0,1) + course.title.substr(course.title.length-2);
  }

  private resolveLearningSpaces(course: Course): void {
    course.getRelationArray(LearningSpace, "learningSpaces").subscribe(learningSpaces => {
      course.learningSpaces = learningSpaces;
    });
  }
}
