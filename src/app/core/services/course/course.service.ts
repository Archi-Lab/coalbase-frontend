import {Injectable, Injector} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Course} from '../../../shared/models/course/course.model';
import {RestService} from 'angular4-hal';

@Injectable()
export class CourseService extends RestService<Course> {
  private _courses: BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>([]);

  constructor(injector: Injector) {
    super(Course, 'courses', injector);
    this.fetchCourses();
  }

  private fetchCourses() {
    // TODO fetch all courses
  }
}
