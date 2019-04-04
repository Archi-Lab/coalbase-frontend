import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

export interface DialogData {
  courseTitle: string;
  learningSpaceAmount: number;
  shouldDelete: boolean;
}

@Component({
  selector: 'app-course-editor-delete-dialog',
  templateUrl: './course-editor-delete-dialog.component.html',
  styleUrls: ['./course-editor-delete-dialog..component.scss']
})
export class CourseEditorDeleteDialogComponent {
  constructor(private readonly dialogRef: MatDialogRef<CourseEditorDeleteDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  public submitAnswer(shouldDelete: boolean): void {
    this.dialogRef.close(shouldDelete);
  }
}
