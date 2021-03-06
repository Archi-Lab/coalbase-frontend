import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Course} from '../../../shared/models/course/course.model';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {CourseService} from '../../../core/services/course/course.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {CourseEditorDeleteDialogComponent} from '../course-editor-delete-dialog/course-editor-delete-dialog.component';
import {LearningSpaceService} from '../../../core/services/learning-space/learning-space.service';
import {LearningSpace} from '../../../shared/models/learning-space/learning-space.model';

@Component({
  selector: 'app-course-editor',
  templateUrl: './course-editor.component.html',
  styleUrls: ['./course-editor.component.scss']
})
export class CourseEditorComponent implements OnInit {
  course: Course = new Course();

  courseForm: FormGroup = new FormGroup({
    shortTitle: new FormControl(''),
    title: new FormControl(''),
    description: new FormControl('')
  });

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly fb: FormBuilder,
    private readonly snack: MatSnackBar,
    private readonly courseService: CourseService,
    private readonly learningSpaceService: LearningSpaceService,
    private readonly dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const identifier = params.get('courseIdentifier');
      if (identifier === 'new') {
        this.course = new Course('', '');
        this.initializeForm(this.course);
      } else if (identifier) {
        this.courseService.get(identifier).subscribe(course => {
          this.course = course;
          this.initializeForm(this.course);
        });
      }
    });
  }

  private initializeForm(course: Course): void {
    this.shortTitleForm.setValue(course.shortTitle);
    this.titleForm.setValue(course.title);
    this.descriptionForm.setValue(course.description);
  }

  public get shortTitleForm(): FormControl {
    return this.courseForm.get('shortTitle') as FormControl;
  }

  public get titleForm(): FormControl {
    return this.courseForm.get('title') as FormControl;
  }

  public get descriptionForm(): FormControl {
    return this.courseForm.get('description') as FormControl;
  }

  public buildShortTitle(title: string): string {
    return title.substr(0,1) + title.substr(title.length-2);
  }

  public saveCourse() {
    this.saveCourseForm();
    if (this.course._links != null && this.course._links.self != null) {
      this.courseService.update(this.course).subscribe();
      this.snack.open("Lehrveranstaltung bearbeitet", undefined, { duration: 2000});
    } else {
      this.courseService.create(this.course).subscribe();
      this.snack.open("Lehrveranstaltung gespeichert", undefined, { duration: 2000});
    }
    this.router.navigate(['../'], {relativeTo: this.route.parent});
  }

  public deleteCourse() {
    this.course.getRelationArray(LearningSpace, 'learningSpaces').subscribe(learningSpaces => {
        this.openDeleteDialog(learningSpaces.length);
      }, error => {
        this.openDeleteDialog(0);
      }
    );
  }

  public backToOverview() {
    this.router.navigate(['../'], {relativeTo: this.route.parent});
  }

  private openDeleteDialog(learningSpaceAmount: number) {
    const dialogRef = this.dialog.open(CourseEditorDeleteDialogComponent, {
      data: {courseTitle: this.course.title, learningSpaceAmount}
    });
    dialogRef.afterClosed().subscribe(shouldDelete => {
      if (shouldDelete) {
        this.courseService.delete(this.course).subscribe(result => this.router.navigate(['../'], {relativeTo: this.route.parent}));
        this.snack.open("Lehrveranstaltung gelöscht", undefined, { duration: 2000});
      }
    });
  }

  private saveCourseForm(): void {
    this.course.shortTitle = this.shortTitleForm.value;
    this.course.title = this.titleForm.value;
    this.course.description = this.descriptionForm.value;

    if (this.course.shortTitle.length == 0) {
      this.course.shortTitle = this.buildShortTitle(this.course.title);
    }
  }
}
