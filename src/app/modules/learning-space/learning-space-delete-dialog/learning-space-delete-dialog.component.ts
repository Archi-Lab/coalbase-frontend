import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

export interface DialogData {
  learningSpaceTitle: string;
}

@Component({
  selector: 'app-course-editor-delete-dialog',
  templateUrl: './learning-space-delete-dialog.component.html',
  styleUrls: ['./learning-space-delete-dialog..component.scss']
})
export class LearningSpaceDeleteDialogComponent {
  constructor(private readonly dialogRef: MatDialogRef<LearningSpaceDeleteDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  public submitAnswer(shouldDelete: boolean): void {
    this.dialogRef.close(shouldDelete);
  }
}
