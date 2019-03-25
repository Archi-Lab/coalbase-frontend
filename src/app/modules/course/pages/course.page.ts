import {Component} from '@angular/core';
import {Course} from '../../../shared/models/course/course.model';
import {LearningSpace} from '../../../shared/models/learning-space/learning-space.model';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'appcourseview',
  templateUrl: './course.page.html',
  styleUrls: ['./course.page.scss']
})
export class CoursePage {
  private sampleCourses: Course[] = [new Course('Softwaretechnik 1', [new LearningSpace('Lernraum')], 'Wichtige Veranstaltung')];
  courses: Observable<Course[]>;

  constructor() {
    this.courses = of(this.sampleCourses);
  }

}
