import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CoursePage} from './pages/course.page';
import {CourseRoutingModule} from './course-routing.module';
import {MaterialModule} from '../../shared/material.module';
import {CourseEditorComponent} from './course-editor/course-editor.component';
import {CourseService} from '../../core/services/course/course.service';
import {CourseOverviewComponent} from './course-overview/course-overview.component';

@NgModule({
  declarations: [CoursePage, CourseEditorComponent, CourseOverviewComponent],
  imports: [
    CourseRoutingModule,
    CommonModule,
    MaterialModule
  ],
  providers: [
    CourseService
  ],
  exports: [
    CoursePage
  ]
})
export class CourseModule {
}
