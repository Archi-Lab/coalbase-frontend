import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PrivacyRoutingModule} from './privacy-routing.module';
import {PrivacyComponent} from './page/privacy.component';
import {MaterialModule} from '../../shared/material.module';

@NgModule({
  declarations: [PrivacyComponent],
  imports: [
    CommonModule,
    PrivacyRoutingModule,
    MaterialModule
  ]
})
export class PrivacyModule {
}
