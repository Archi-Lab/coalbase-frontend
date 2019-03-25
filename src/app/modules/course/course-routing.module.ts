import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {CoursePage} from './pages/course.page';

const CourseRoutes: Routes = [
  {
    path: '',
    component: CoursePage,
    children: [
      {path: '', component: CoursePage},
      {path: ':courseIdentifier', component: CoursePage},
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
