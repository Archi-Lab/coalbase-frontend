import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CoursePage} from './pages/course.page';
import {CourseRoutingModule} from './course-routing.module';
import {MaterialModule} from '../../shared/material.module';
import {CourseEditorComponent} from './course-editor/course-editor.component';
import {CourseOverviewComponent} from './course-overview/course-overview.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [CoursePage, CourseEditorComponent, CourseOverviewComponent],
  imports: [
    CourseRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [
  ],
  exports: [
    CoursePage
  ]
})
export class CourseModule {
}
