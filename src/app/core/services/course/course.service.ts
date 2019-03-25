import {Injectable, Injector} from '@angular/core';
import {BehaviorSubject, from, Observable} from 'rxjs';
import {Course} from '../../../shared/models/course/course.model';
import {RestService} from 'angular4-hal';
import {reject} from 'q';

@Injectable()
export class CourseService extends RestService<Course> {
  private _courses: BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>([]);

  constructor(injector: Injector) {
    super(Course, 'courses', injector);
    this.fetchCourses();
  }

  public getFirstCourse(): Observable<Course> {
    return from(new Promise(resolve => {
      this.getAll().subscribe(value => {
        resolve(value[0]);
      }, error => reject(error));
    }));
  }

  delete(entity: Course): Observable<Object> {
    this.deleteCourseFromState(entity);
    return super.delete(entity);
  }

  create(entity: Course): Observable<Observable<never> | Course> {
    return from(new Promise(resolve => {
      super.create(entity).subscribe(course => {
        this.createCourseInState(course as Course);
        resolve(course);
      });
    }));
  }

  update(entity: Course): Observable<Observable<never> | Course> {
    this.updateCourseInState(entity);
    return super.update(entity);
  }

  patch(entity: Course): Observable<Observable<never> | Course> {
    this.updateCourseInState(entity);
    return super.patch(entity);
  }

  public get courses(): Observable<Course[]> {
    return this._courses.asObservable();
  }

  private fetchCourses() {
    super.getAll().subscribe(courses => {
      this._courses.next(courses);
    });
  }

  private deleteCourseFromState(course: Course): void {
    let state: Course[] = this._courses.value;
    state = state.filter(stateCourse => stateCourse.getIdFromUri() !== course.getIdFromUri());
    this._courses.next(state);
  }

  private updateCourseInState(course: Course): void {
    const state: Course[] = this._courses.value;
    state.forEach((stateCourse, index) => {
      if (stateCourse.getIdFromUri() === course.getIdFromUri()) {
        state[index] = course;
      }
    });
    this._courses.next(state);
  }

  private createCourseInState(course: Course): void {
    const state: Course[] = this._courses.value;
    state.push(course);
    this._courses.next(state);
  }

}
