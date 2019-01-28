import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ImprintRoutingModule} from './imprint-routing.module';
import {ImprintComponent} from './page/imprint.component';
import {MaterialModule} from '../../shared/material.module';

@NgModule({
  declarations: [ImprintComponent],
  imports: [
    CommonModule,
    ImprintRoutingModule,
    MaterialModule
  ]
})
export class ImprintModule {
}
