import {Injectable, Injector} from '@angular/core';
import {Course} from '../../../shared/models/course/course.model';
import {ListResourceService} from '../ListResourceService';

@Injectable()
export class CourseService extends ListResourceService<Course> {
  constructor(injector: Injector) {
    super(Course, 'courses', injector);
    this.fetchListResource();
  }
}
