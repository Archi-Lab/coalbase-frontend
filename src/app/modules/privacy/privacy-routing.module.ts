import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PrivacyComponent} from './page/privacy.component';

const routes: Routes = [
  {
    path: '',
    component: PrivacyComponent,
    children: [
      {path: '', component: PrivacyComponent},
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivacyRoutingModule {
}
