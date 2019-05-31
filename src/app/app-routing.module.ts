import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

const appRoutes: Routes = [
  {path: '', redirectTo: 'courses', pathMatch: 'full'},
  {
    path: 'courses',
    loadChildren: './modules/course/course.module#CourseModule'
  },
  {
    path: 'imprint',
    loadChildren: './modules/imprint/imprint.module#ImprintModule'
  },
  {
    path: 'privacy',
    loadChildren: './modules/privacy/privacy.module#PrivacyModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
