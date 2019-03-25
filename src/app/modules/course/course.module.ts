import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CoursePage} from './pages/course.page';
import {CourseRoutingModule} from './course-routing.module';
import {MaterialModule} from '../../shared/material.module';
import {CourseEditorComponent} from './course-editor/course-editor.component';

@NgModule({
  declarations: [CoursePage, CourseEditorComponent],
  imports: [
    CourseRoutingModule,
    CommonModule,
    MaterialModule
  ]
})
export class CourseModule {
}
