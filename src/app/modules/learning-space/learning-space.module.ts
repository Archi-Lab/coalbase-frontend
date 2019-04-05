import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../shared/material.module';
import {LearningSpaceRoutingModule} from './learning-space-routing.module';
import {LearningSpacePage} from './pages/learning-space.page';
import {LearningSpaceEditorComponent} from './learning-space-editor/learning-space-editor.component';
import {LearningSpaceOverviewComponent} from './learning-space-overview/learning-space-overview.component';
import {LearningSpaceDeleteDialogComponent} from './learning-space-delete-dialog/learning-space-delete-dialog.component';

@NgModule({
  declarations: [
    LearningSpacePage,
    LearningSpaceEditorComponent,
    LearningSpaceOverviewComponent,
    LearningSpaceDeleteDialogComponent
  ],
  imports: [
    LearningSpaceRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  entryComponents: [LearningSpaceDeleteDialogComponent]
})
export class LearningSpaceModule {
}
