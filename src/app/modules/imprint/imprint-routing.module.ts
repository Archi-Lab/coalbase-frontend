import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ImprintComponent} from './page/imprint.component';

const routes: Routes = [
  {
    path: '',
    component: ImprintComponent,
    children: [
      {path: '', component: ImprintComponent},
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImprintRoutingModule {
}
