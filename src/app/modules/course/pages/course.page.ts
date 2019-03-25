import {Component} from '@angular/core';
import {Course} from '../../../shared/models/course/course.model';
import {LearningSpace} from '../../../shared/models/learning-space/learning-space.model';
import {Observable, of} from 'rxjs';
import {CourseService} from '../../../core/services/course/course.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'appcourseview',
  templateUrl: './course.page.html',
  styleUrls: ['./course.page.scss']
})
export class CoursePage {
  private sampleCourses: Course[] = [new Course('Softwaretechnik 1', [new LearningSpace('Lernraum')], 'Wichtige Veranstaltung')];
  courses: Observable<Course[]>;

  constructor(private courseService: CourseService, private router: Router, private route: ActivatedRoute) {
    // TODO use service instead of sample data
    this.courses = of(this.sampleCourses);
    this.redirectIfEmpty();
  }

  private redirectIfEmpty() {
    this.courses.subscribe(courses => {
      if (courses.length === 0) {
        this.router.navigate(['new'], {relativeTo: this.route});
      }
    });
  }
}
