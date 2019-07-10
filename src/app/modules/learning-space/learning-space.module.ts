import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../shared/material.module';
import {LearningSpaceRoutingModule} from './learning-space-routing.module';
import {LearningSpacePage} from './pages/learning-space.page';
import {LearningSpaceEditorComponent} from './learning-space-editor/learning-space-editor.component';
import {LearningSpaceOverviewComponent} from './learning-space-overview/learning-space-overview.component';
import {LearningSpaceDeleteDialogComponent} from './learning-space-delete-dialog/learning-space-delete-dialog.component';
import {LearningOutcomeEditorComponent} from "./learning-outcome-editor/learning-outcome-editor.component";
import {LearningOutcomeViewComponent} from "./learning-outcome-view/learning-outcome-view.component";
import {ExamFormEditorComponent} from "./exam-form-editor/exam-form-editor.component";
import {ExamFormViewComponent} from "./exam-form-view/exam-form-view.component";
import {WebLinkFormEditorComponent} from "./web-link-form-editor/webLink-form-editor.component";
import {WebLinkViewComponent} from "./web-link-view/web-link-view.component";
import {CommentEditorComponent} from "./comment-editor/comment-editor.component";

@NgModule({
  declarations: [
    LearningSpacePage,
    LearningSpaceEditorComponent,
    LearningSpaceOverviewComponent,
    LearningSpaceDeleteDialogComponent,
    LearningOutcomeEditorComponent,
    LearningOutcomeViewComponent,
    WebLinkFormEditorComponent,
    WebLinkViewComponent,
    ExamFormEditorComponent,
    ExamFormViewComponent,
    CommentEditorComponent
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
