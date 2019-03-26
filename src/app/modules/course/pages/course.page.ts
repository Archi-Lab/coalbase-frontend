import {Component} from '@angular/core';
import {Course} from '../../../shared/models/course/course.model';
import {Observable} from 'rxjs';
import {CourseService} from '../../../core/services/course/course.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'appcourseview',
  templateUrl: './course.page.html',
  styleUrls: ['./course.page.scss']
})
export class CoursePage {
  courses: Observable<Course[]>;

  constructor(private courseService: CourseService, private router: Router, private route: ActivatedRoute) {
    this.courses = this.courseService.listResource;
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
