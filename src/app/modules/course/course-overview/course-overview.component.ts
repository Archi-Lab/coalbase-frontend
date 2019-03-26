import {Component} from '@angular/core';
import {Course} from '../../../shared/models/course/course.model';
import {Observable} from 'rxjs';
import {CourseService} from '../../../core/services/course/course.service';

@Component({
  selector: 'appcourseview',
  templateUrl: './course-overview.component.html',
  styleUrls: ['./course-overview.component.scss']
})
export class CourseOverviewComponent {
  courses: Observable<Course[]>;

  constructor(private courseService: CourseService) {
    this.courses = this.courseService.listResource;
  }
}
