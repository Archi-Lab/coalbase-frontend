import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {CoursePage} from './pages/course.page';
import {CourseEditorComponent} from './course-editor/course-editor.component';

const CourseRoutes: Routes = [
  {
    path: '',
    component: CoursePage,
    children: [
      {path: '', component: CourseEditorComponent},
      {path: ':courseIdentifier', component: CourseEditorComponent},
    ],
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(CourseRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class CourseRoutingModule {
}
