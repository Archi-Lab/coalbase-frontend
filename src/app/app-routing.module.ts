import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

const appRoutes: Routes = [
  {path: '', redirectTo: 'learning-outcomes', pathMatch: 'full'},
  {
    path: 'learning-outcomes',
    loadChildren: './modules/learning-outcome/learning-outcome.module#LearningOutcomeModule'
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
