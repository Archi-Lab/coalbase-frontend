import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../../shared/material.module";
import {LearningSpaceRoutingModule} from "./learning-space-routing.module";
import {LearningSpaceService} from "../../core/services/learning-space/learning-space.service";
import {LearningSpacePage} from "./pages/learning-space.page";
import { LearningSpaceEditorComponent } from './learning-space-editor/learning-space-editor.component';
import { LearningSpaceOverviewComponent } from './learning-space-overview/learning-space-overview.component';

@NgModule({
  declarations: [
    LearningSpacePage,
    LearningSpaceEditorComponent,
    LearningSpaceOverviewComponent,
  ],
  imports: [
    LearningSpaceRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [
    LearningSpaceService
  ]
})
export class LearningSpaceModule {
}
